let idPessoa = JSON.parse(localStorage.getItem("usuarioCorrente"));

// Função para exibir pets
async function Exibir() {
  try {
    const response = await fetch('http://localhost:3000/pets', { method: 'GET' });
    const bancoPets = await response.json();
    var cards = "";
    var img = "";
    console.log(bancoPets)
    if (bancoPets.length != 0) {
      for (var index = 0; index < bancoPets.length; index++) {
        if (idPessoa == bancoPets[index].pessoa) {
          if (bancoPets[index].especie == "Cachorro") {
            img = "../src/imagens/puppy.png";
          } else {
            img = "../src/imagens/cat main.png";
          }
          cards += `
            <div class="card mt-5 mx-5" id="card" style = "width: 550px;">
              <div class="row justify-content-center">
                <div class="col-md-6 text-center">
                  <img src="${img}" alt="" class="pt-4 pb-1" width="100px" id="imgcard">  
                </div>
                <div class="col-md-4 text-center">
                  <p class="pt-4"><b>${bancoPets[index].Nome}</b></p>
                  <p>${bancoPets[index].Genero}</p>
                  <p>${bancoPets[index].Idade} Ano(s)</p>
                  <p>${bancoPets[index].Raca}</p>
                </div>
              </div>
            </div>
          `;
        }
      }
    }

    if (cards == '') {
      document.querySelector("#Cards").innerHTML = `<h3 class="text-center mt-4"><b> Não existem pets cadastrados !! </b></h3>`;
    } else {
      document.querySelector("#Cards").innerHTML = cards;
    }

    // Função limitar caracteres
    const input = document.getElementById('idade');
    input.addEventListener('input', function() {
      const maxLength = parseInt(input.getAttribute('maxlength'));
      const currentValue = input.value;

      if (currentValue.length > maxLength) {
        input.value = currentValue.slice(0, maxLength);
      }
    });

    const altinput = document.getElementById('altidade');
    altinput.addEventListener('input', function() {
      const maxxLength = parseInt(altinput.getAttribute('maxlength'));
      const currenttValue = altinput.value;

      if (currenttValue.length > maxxLength) {
        altinput.value = currenttValue.slice(0, maxxLength);
      }
    });

    // Preencher o modal de editar
    const modal = document.getElementById("edit");
    if (modal) {
      modal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget;
        var idrecipient = button.getAttribute('data-bs-whatever');
        modal.querySelector('#cofreBanco').value = idrecipient;
        modal.querySelector('#altname').value = bancoPets[idrecipient].nome;
        modal.querySelector('#altidade').value = bancoPets[idrecipient].idade;
        modal.querySelector('#altraca').value = bancoPets[idrecipient].raca;

        var opcoes = document.getElementsByName("altSexo");
        for (var i = 0; i < opcoes.length; i++) {
          if (opcoes[i].value === bancoPets[idrecipient].sexo) {
            opcoes[i].checked = true;
            break;
          }
        }

        opcoes = document.getElementsByName("altEspecie");
        for (var i = 0; i < opcoes.length; i++) {
          if (opcoes[i].value === bancoPets[idrecipient].especie) {
            opcoes[i].checked = true;
            break;
          }
        }
      });
    }
  } catch (error) {
    console.error('Erro ao buscar os pets:', error);
  }
}

// Cadastro de Pet
async function cadastroPet() {
  var opcaoEspecie = document.getElementsByName("Especie");
  var valorSelecionadoEspecie = "";

  for (var i = 0; i < opcaoEspecie.length; i++) {
    if (opcaoEspecie[i].checked) {
      valorSelecionadoEspecie = opcaoEspecie[i].value;
      break;
    }
  }

  var opcaoSexo = document.getElementsByName("Sexo");
  var valorSelecionadoSexo = "";

  for (var i = 0; i < opcaoSexo.length; i++) {
    if (opcaoSexo[i].checked) {
      valorSelecionadoSexo = opcaoSexo[i].value;
      break;
    }
  }

  var nome = document.getElementById("name").value;
  var idade = document.getElementById("idade").value;
  var raca = document.getElementById("raca").value;

  if (nome == '' || idade == '' || raca == '') {
    AlertPreencher();
  } else {
    var novoPet = {
      "pessoa": idPessoa,
      "nome": nome,
      "sexo": valorSelecionadoSexo,
      "idade": idade,
      "raca": raca,
      "especie": valorSelecionadoEspecie
    };

    try {
      await fetch('http://localhost:3000/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoPet)
      });
      AlertSucesso("Cadastro");
      $('#Cadastro').modal('hide');
      Exibir();
      document.getElementById("name").value = '';
      document.getElementById("idade").value = '';
      document.getElementById("raca").value = '';
    } catch (error) {
      console.error('Erro ao cadastrar o pet:', error);
    }
  }
}

// Função Excluir
async function AlertExcluir(id) {
  Swal.fire({
    title: 'Excluir',
    text: "Deseja prosseguir com a exclusão do pet?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire('Excluido', 'Pet excluido com sucesso!', 'success');
      try {
        await fetch(`https://sua-api.com/pets/${id}`, {
          method: 'DELETE'
        });
        Exibir();
      } catch (error) {
        console.error('Erro ao excluir o pet:', error);
      }
    }
  });
}

// Função de editar pet
async function Editar() {
  var pegarID = document.getElementById("cofreBanco").value;
  var nomeEdit = document.getElementById("altname").value;
  var racaEdit = document.getElementById("altraca").value;
  var idadeEdit = document.getElementById("altidade").value;

  var opcaoAltSexo = document.getElementsByName("altSexo");
  var valorSelecionadoAltSexo = "";

  for (var i = 0; i < opcaoAltSexo.length; i++) {
    if (opcaoAltSexo[i].checked) {
      valorSelecionadoAltSexo = opcaoAltSexo[i].value;
      break;
    }
  }
  
  var opcaoAltEspecie = document.getElementsByName("altEspecie");
  var valorSelecionadoAltEspecie = "";

  for (var i = 0; i < opcaoAltEspecie.length; i++) {
    if (opcaoAltEspecie[i].checked) {
      valorSelecionadoAltEspecie = opcaoAltEspecie[i].value;
      break;
    }
  }

  if (nomeEdit == '' || racaEdit == '' || idadeEdit == '') {
    AlertPreencher();
  } else {
    var petEditado = {
      "nome": nomeEdit,
      "sexo": valorSelecionadoAltSexo,
      "idade": idadeEdit,
      "raca": racaEdit,
      "especie": valorSelecionadoAltEspecie
    };

    try {
      await fetch(`https://sua-api.com/pets/${pegarID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(petEditado)
      });
      AlertSucesso("Editar");
      $('#edit').modal('hide');
      Exibir();
    } catch (error) {
      console.error('Erro ao editar o pet:', error);
    }
  }
}

onload = () => {
  Exibir();
};

// Alert preencher campos
function AlertPreencher() {
  Swal.fire('Erro', 'Preencha todos os campos!', 'error');
}

// Alert sucesso
function AlertSucesso(opcao) {
  var texto = '';
  if (opcao == 'Cadastro') {
    texto = "Pet cadastrado com sucesso!";
  } else {
    texto = "Informações do pet editadas com sucesso!";
  }
  Swal.fire('Concluído', texto, 'success');
}
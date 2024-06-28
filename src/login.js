function validarCampos(senha, cpf) {
    if (!senha || !cpf) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Todos os campos devem ser preenchidos!'
        });
        return false;
    }
    return true;
}

async function GetDados(cpf) {
    const response = await fetch(`/Users/${cpf}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    if(!response.ok) throw new Error("Usuário não encontrado.");

    return response.json();
}

async function Login(event) {
    event.preventDefault();

    const cpf = document.getElementById('dadosUsuario').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if(!validarCampos(cpf, senha)) return;

    try {
        const dados = await GetDados(cpf);

        if(dados.cpf === cpf && dados.senha === senha) {
            window.location.href = 'home.html';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Email ou senha incorretos!'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message || 'Ocorreu um erro ao tentar fazer login.'
        });
    }   
}

document.getElementById('entrar').addEventListener('click', Login);
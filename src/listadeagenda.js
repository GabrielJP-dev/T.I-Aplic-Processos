var list = "";

function imprimir(agendamentos){
    for(var i = 0; i < agendamentos.length; i++){
        list += `
        <tr>
          <th>${agendamentos[i].nome}</th>
          <td>${agendamentos[i].telefone}</td>
          <td>${agendamentos[i].pet}</td>
          <td>${agendamentos[i].servico}</td>
          <td>${agendamentos[i].data}</td>
          <td>${agendamentos[i].horario}</td>
        </tr>
        `;
    }

    document.querySelector("#list-agendamentos").innerHTML = list;
}

function iniciar(){
    fetch('URL_DA_API') // Substitua 'URL_DA_API' pela URL real da API
        .then(response => response.json())
        .then(agendamentos => {
            if(agendamentos.length === 0){
                document.querySelector("#list-agendamentos").innerHTML = `Não há agendamentos cadastrados`;
            } else {
                imprimir(agendamentos);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os agendamentos:', error);
            document.querySelector("#list-agendamentos").innerHTML = `Erro ao carregar agendamentos`;
        });
}

window.onload = () => {
    iniciar();
};

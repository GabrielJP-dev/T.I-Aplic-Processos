var list = "";

async function buscarServicos(){
    const response = await fetch('http://localhost:3000/servicos', {
        method: 'GET'
    })
    if (!response.ok) {
        const error = await response.json();
        alert(`Erro ao buscar serviços: ${error.message}`);
        return
    }
    return await response.json();
}

function imprimir(agendamentos, servico){
    console.log(agendamentos)
    for(var i = 0; i < agendamentos.length; i++){
       var nomeServico = servico.find(s => s.ServiceId == agendamentos[i].ServiceId)
        list += `
        <tr>
          <th>${agendamentos[i].Name}</th>
          <td>${nomeServico.Name}</td>
          <td>${agendamentos[i].date}</td>
          <td>${agendamentos[i].time}</td>
        </tr>
        `;
    }

    document.querySelector("#list-agendamentos").innerHTML = list;
}
function iniciar(){
    fetch('http://localhost:3000/agendamentos') // Substitua 'URL_DA_API' pela URL real da API
        .then(response => response.json())
        .then(async agendamentos => {
            if(agendamentos.length === 0){
                document.querySelector("#list-agendamentos").innerHTML = `Não há agendamentos cadastrados`;
            } else {
                var servico = await buscarServicos();
                imprimir(agendamentos, servico);
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

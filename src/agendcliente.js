var db_servicos
var url_servico      = 'http://localhost:3000/servicos'
var url_agendamentos = 'http://localhost:3000/agendamentos'

var nomeSelect = document.getElementById("nomes")
var servSelect = document.getElementById("servico")
var dataSelect = document.getElementById("data")
var horaSelect = document.getElementById("horario")

var s_id;

document.addEventListener('DOMContentLoaded',async ()=>{

    servSelect.addEventListener('change', function() {
        const selectedOption = servSelect.options[servSelect.selectedIndex];
        s_id = selectedOption.getAttribute('s_id');
    });

    db_servicos = await fetch_servicos()
    db_servicos.forEach(element => {
        add_option_for_servico(element);
    })
})

document.getElementById("agendar_submit").addEventListener('click',async ()=>{
    
    if (nomeSelect.value == "" || dataSelect.value == "" || horaSelect.value == "") {
        alert("Favor preencher todos os campos");
        return;
    }

    var agendamento = {
        Name: nomeSelect.value,
        ServiceId: s_id,
        Date: formatarData(dataSelect.value),
        Time: horaSelect.value
    }

    const response = await fetch('http://localhost:3000/agendamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento)
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);
    } else {
        const error = await response.json();
        alert(`Erro ao cadastrar agendamento: ${error.message}`);
    }

}),

dataSelect.addEventListener('change', function (event) {
    const selectedDate = new Date(this.value);
    updateTimeOptions(selectedDate.getDay());
});

function add_option_for_servico(servico) {
    var el = document.getElementById("sel_servico")
    el.innerHTML += `<option s_id=${servico.ServiceId}>${servico.Name}</option>`;
}

async function new_agendamento(object) {
    const response = await fetch(url_agendamentos, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(object)
    });

    if (!response.ok) {
        const error = await response.json();
        alert(`Erro ao cadastrar serviço: ${error.message}`);
        return;
    }

    console.log("Agendamento realizado!");
}

async function fetch_servicos() {
    const response = await fetch(url_servico, {
        method: 'GET'
    })
    if (!response.ok) {
        const error = await response.json();
        alert(`Erro ao buscar serviços: ${error.message}`);
        return
    }
    return await response.json();
}

function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate() + 1).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

const timeInput = document.getElementById('option');

function updateTimeOptions(day) {

    let start, end;
    if (day >= 0 && day <= 4) { // Segunda à Sexta
        start = 8;
        end = 18;
    } else if (day === 5) { // Sábado
        start = 8;
        end = 14;
    } else { // Domingo
        start = null;
        end = null;
    }
    // Limpa opções existentes
    while (timeInput.firstChild) {
        timeInput.removeChild(timeInput.firstChild);
    }
    // Cria opção de seleção
    let option = document.createElement('option');

    //Deixa o select de horário visível só depois da pessoa selecionar a data
    document.getElementById("horario").style.visibility = "visible"

    // Adiciona novas opções
    if (start !== null && end !== null) {
        for (let i = start; i < end; i++) {
            for (let j = 0; j < 2; j++) {
                let option = document.createElement('option');
                option.text = `${i.toString().padStart(2, '0')}:${j === 0 ? '00' : '30'}`;
                option.value = option.text;
                timeInput.add(option);
            }
        }
    } else {
        option.text = "Não há atendimento no domingo."
        option.value = "Domingo"
        timeInput.add(option);
    }
}
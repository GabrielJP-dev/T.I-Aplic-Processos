// cadastro_servico.js

document.getElementById('cadastro_servico').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página

    // Captura os valores dos campos do formulário
    const profissionalID = document.getElementById('profissionalID').value;
    const servicoNome = document.getElementById('servicoNome').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;
    const dataInicio = document.getElementById('dataInicio').value;

    // Validação dos campos (exemplo simples)
    if (!profissionalID || !servicoNome || !preco || !descricao || !dataInicio) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Cria um objeto com os dados do formulário
    const servico = {
        profissionalID,
        nome: servicoNome,
        preco: parseFloat(preco),
        descricao,
        dataInicio
    };

    try {
        // Envia os dados para o backend
        const response = await fetch('http://localhost:5256/api/servico', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(servico)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            document.getElementById('cadastro_servico').reset(); // Limpa o formulário
        } else {
            const error = await response.json();
            alert(`Erro ao cadastrar serviço: ${error.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});

function sair() {
    // Implementação da função de sair (exemplo simples)
    alert('Você saiu da conta.');
    // Redirecionar para a página de login ou realizar outra ação de logout
}

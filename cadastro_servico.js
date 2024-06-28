// cadastro_servico.js

document.getElementById('cadastrar').addEventListener('click', async function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página

    // Captura os valores dos campos do formulário
    const servicoNome = document.getElementById('servicoNome').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;

    // Validação dos campos (exemplo simples)
    if (!servicoNome || !preco || !descricao) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Cria um objeto com os dados do formulário
    const servico = {
        nome: servicoNome,
        preco: parseFloat(preco),
        descricao: descricao
    };

    const response = await fetch('http://localhost:3000/servicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
});

function sair() {
    // Implementação da função de sair (exemplo simples)
    alert('Você saiu da conta.');
    // Redirecionar para a página de login ou realizar outra ação de logout
}

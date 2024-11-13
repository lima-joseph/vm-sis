// Função para remover um funcionário pelo ID
async function removerFuncionario() {
    const apiUrlBase = "https://sheetdb.io/api/v1/cots00ern7jle/Id/";
    const idRemover = document.getElementById('idRemover').value.trim();

    if (!idRemover) {
        criarAlerta('danger', 'Por favor, insira o ID do funcionário!', document.getElementById('alerts-space'), 1);
        return;
    }

    if (!confirm(`Tem certeza que deseja remover o funcionário com ID: ${idRemover}?`)) {
        return;
    }

    try {
        const response = await fetch(apiUrlBase + idRemover, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao remover funcionário: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.deleted === 1) {
            criarAlerta('success', 'Funcionário removido com sucesso!', document.getElementById('alerts-space'), 1);
        } else {
            criarAlerta('danger', 'Funcionário não encontrado!', document.getElementById('alerts-space'), 1);
        }

        document.getElementById('idRemover').value = '';

        listarFuncionarios();

    } catch (error) {
        console.error('Erro ao remover funcionário:', error);
        criarAlerta('danger', 'Erro ao remover funcionário. Tente novamente.', document.getElementById('alerts-space'), 1);
    }
}

document.getElementById('removerFuncionario').addEventListener('submit', function(event) {
    event.preventDefault();
    removerFuncionario();
});

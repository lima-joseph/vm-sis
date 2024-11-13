let funcionariosCache = []; // Cache para armazenar os funcionários

// Função para listar funcionários e preencher a tabela
async function listarFuncionarios() {
    const apiUrl = "https://sheetdb.io/api/v1/cots00ern7jle";
    const tabelaBody = document.querySelector("table tbody");

    // Exibe o indicador de carregamento
    tabelaBody.innerHTML = `
        <tr>
            <th colspan="4" class="text-center">
                <div class="spinner-border text-center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </th>
        </tr>
    `;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro ao obter funcionários: ${response.statusText}`);
        }

        const data = await response.json();

        funcionariosCache = data;

        if (data.length === 0) {
            tabelaBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">Nenhum funcionário cadastrado.</td>
                </tr>
            `;
            return;
        }

        renderizarTabela(data);
    } catch (error) {
        console.error('Erro ao listar funcionários:', error);
        tabelaBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">Erro ao carregar funcionários.</td>
            </tr>
        `;
    }
}

function renderizarTabela(funcionarios) {
    const tabelaBody = document.querySelector("table tbody");
    let tabelaHTML = '';

    if (funcionarios.length === 0) {
        tabelaBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">Nenhum funcionário encontrado.</td>
            </tr>
        `;
        return;
    }

    funcionarios.forEach(funcionario => {
        tabelaHTML += `
            <tr>
                <td>${funcionario.Id}</td>
                <td>${funcionario.Nome}</td>
                <td>${funcionario.Cargo}</td>
                <td>R$ ${parseFloat(funcionario['Valor Hora']).toFixed(2)}</td>
            </tr>
        `;
    });

    tabelaBody.innerHTML = tabelaHTML;
}

// Função para filtrar funcionários pelo nome
function filtrarFuncionarios(event) {
    const termoPesquisa = event.target.value.toLowerCase();
    const funcionariosFiltrados = funcionariosCache.filter(funcionario =>
        funcionario.Nome.toLowerCase().includes(termoPesquisa)
    );

    renderizarTabela(funcionariosFiltrados);
}

// Adiciona o event listener para o campo de pesquisa
document.getElementById('lupaFuncionarios').addEventListener('input', filtrarFuncionarios);

// Chama a função ao carregar a página para preencher a tabela
window.onload = listarFuncionarios();

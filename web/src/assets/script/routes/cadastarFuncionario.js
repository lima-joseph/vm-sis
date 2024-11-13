async function obterUltimoId() {
    const apiUrl = "https://sheetdb.io/api/v1/cots00ern7jle";

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Erro ao obter funcionários: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            return 0;
        }

        const ultimoId = Math.max(...data.map(funcionario => parseInt(funcionario.Id, 10)));

        return ultimoId + 1;
    } catch (error) {
        console.error('Erro ao obter último ID:', error);
        alert('Erro ao carregar dados. Tente novamente.');
        return 0;
    }
}


window.onload = async function() {
    const novoId = await obterUltimoId();
    document.getElementById('idAdicionar').value = novoId;
};

async function cadastrarFuncionario() {
    const apiUrl = "https://sheetdb.io/api/v1/cots00ern7jle";

    // Captura os valores dos campos (ID está desativado)
    const id = document.getElementById('idAdicionar').value.trim();
    const nome = document.getElementById('nomeAdicionar').value.trim();
    const cargo = document.getElementById('cargoAdicionar').value.trim();
    const vh = document.getElementById('vhAdicionar').value.trim();

    // Validação dos campos (exceto o ID)
    if (!nome || !cargo || !vh) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'Id': id,
                        'Nome': nome,
                        'Cargo': cargo,
                        'Valor Hora': vh
                    }
                ]
            })
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao cadastrar funcionário: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Funcionário cadastrado:', data);

        criarAlerta('success', 'Funcionário cadastrado com sucesso!', document.getElementById('alerts-space'), 1);

        // Limpa os campos do formulário (exceto o ID) e atualiza o próximo ID
        document.getElementById('nomeAdicionar').value = '';
        document.getElementById('cargoAdicionar').value = '';
        document.getElementById('vhAdicionar').value = '';

        // Atualiza o campo de ID com o próximo valor
        const novoId = await obterUltimoId();
        document.getElementById('idAdicionar').value = novoId;
        listarFuncionarios();

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar funcionário. Tente novamente.');
    }
}

document.getElementById('adicionarFuncionario').addEventListener('submit', function(event) {
    event.preventDefault();
    cadastrarFuncionario();
});

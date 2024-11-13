async function carregarFuncionariosNoSeletor() {
    const apiUrl = "https://sheetdb.io/api/v1/cots00ern7jle";
    const seletor = document.getElementById('seletorFuncionarios');
    const seletorRemover = document.getElementById('seletorFuncionariosRemover');
    seletorFuncionariosRemover

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erro ao obter funcionários: ${response.statusText}`);
        }

        const data = await response.json();

        seletor.innerHTML = `<option value="">Selecione um funcionário</option>`;

        data.forEach(funcionario => {
            const option = document.createElement('option');
            const optionRm = document.createElement('option');
            option.value = funcionario.Nome;
            option.textContent = funcionario.Nome;
            optionRm.value = funcionario.Nome;
            optionRm.textContent = funcionario.Nome;
            seletor.appendChild(option);
            seletorRemover.appendChild(optionRm);
        });

    } catch (error) {
        console.error('Erro ao carregar funcionários no seletor:', error);
        criarAlerta('danger', 'Erro ao carregar funcionários.', document.getElementById('alerts-space'), 1);
    }
}

window.onload = () => {
    carregarFuncionariosNoSeletor();
};


async function adicionarPonto() {
    const apiUrl = "https://sheetdb.io/api/v1/cots00ern7jle?sheet=pontos"; // Ajuste a URL se necessário

    // Captura os valores dos campos
    const data = document.getElementById('dataAdicionar').value.trim();
    const funcionario = document.getElementById('seletorFuncionarios').value.trim();
    const horario1 = document.getElementById('seletorEntradaSaida1').value.trim();
    const horario2 = document.getElementById('seletorEntradaSaida2').value.trim();

    // Validação dos campos
    if (!data || !funcionario || !horario1 || !horario2) {
        criarAlerta('danger', 'Por favor, preencha todos os campos!', document.getElementById('alerts-space'), 1);
        return;
    }

    // Extrai os horários de entrada e saída do campo selecionado
    const [entradaManha, saidaManha] = horario1.split(' - ');
    const [entradaTarde, saidaTarde] = horario2.split(' - ');

    try {
        // Envia a requisição para adicionar o ponto
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'Funcionario': funcionario,
                        'Data': data,
                        'Entrada Manha': entradaManha,
                        'Saida Manha': saidaManha,
                        'Entrada Tarde': entradaTarde,
                        'Saida Tarde': saidaTarde
                    }
                ]
            })
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao adicionar ponto: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Ponto registrado:', result);

        criarAlerta('success', 'Ponto adicionado com sucesso!', document.getElementById('alerts-space'), 1);

        // Limpa o formulário após o envio
        document.getElementById('dataAdicionar').value = '';
        document.getElementById('seletorFuncionarios').value = '';
        document.getElementById('seletorEntradaSaida1').value = '';
        document.getElementById('seletorEntradaSaida2').value = '';

    } catch (error) {
        console.error('Erro ao adicionar ponto:', error);
        criarAlerta('danger', 'Erro ao adicionar ponto. Tente novamente.', document.getElementById('alerts-space'), 1);
    }
}

// Adiciona o event listener para o formulário
document.getElementById('adicionarPonto').addEventListener('submit', function(event) {
    event.preventDefault();
    adicionarPonto();
});


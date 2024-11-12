async function cadastrarFuncionario() {
    const apiUrl = "https://sheetdb.io/api/v1/cots00ern7jle";

    // Captura os valores dos campos
    const id = document.getElementById('idAdicionar').value.trim();
    const nome = document.getElementById('nomeAdicionar').value.trim();
    const cargo = document.getElementById('cargoAdicionar').value.trim();
    const vh = document.getElementById('vhAdicionar').value.trim();

    // Validação dos campos
    if (!id || !nome || !cargo || !vh) {
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
        
        criarAlerta('success','Funcionário cadastrado com sucesso!',document.getElementById('alerts-space'),1);
        
        document.getElementById('idAdicionar').value = '';
        document.getElementById('nomeAdicionar').value = '';
        document.getElementById('cargoAdicionar').value = '';
        document.getElementById('vhAdicionar').value = '';
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar funcionário. Tente novamente.');
    }
}

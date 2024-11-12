async function criarAlerta(tipo,mensagem,local,codIcone) {

    let icon;

    switch(codIcone){
        case 0:
            icon = "bi bi-x-circle-fill";
            break;
        case 1:
            icon = "bi bi-check-circle-fill";
            break;
        case 2:
            icon = "bi bi-info-circle-fill";
            break;
        
    }

    local.innerHTML = `<div class="alert p-2 alert-${tipo} alert-dismissible" role="alert" style="font-size:12px;"><i class="${icon}"></i> ${mensagem}</div>`;
    setTimeout(() =>{
    local.innerHTML = '';
    },3000);
}
document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("login");

    if (localStorage.getItem("loggedIn") === "true") {
        window.location.href = "/src/pages/home.html";
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (!email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        const url = `https://sheetdb.io/api/v1/kkv05x7gr7bx0/search?email[]=${email}&senha[]=${senha}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("userEmail", email);
                    criarAlerta('succes','Login efetuado com sucesso',document.getElementById('alert-login'),1);
                    window.location.href = "/src/pages/home.html";
                } else {
                    criarAlerta('danger','Erro ao efetuar Login',document.getElementById('alert-login'),0);
                }
            })
            .catch(error => {
                console.log(error);
            });
    });
});
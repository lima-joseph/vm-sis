document.addEventListener("DOMContentLoaded", function () {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "../login.html";
        }
});

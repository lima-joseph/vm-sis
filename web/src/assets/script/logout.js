document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");
    
    logoutButton.addEventListener("click", function () {
        localStorage.setItem("loggedIn", "false");
        localStorage.removeItem("userEmail");
        
        window.location.href = "/src/login.html";
    });
});

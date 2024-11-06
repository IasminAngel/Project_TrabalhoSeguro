document.getElementById("confirm").addEventListener("click", function (event) {
    event.preventDefault();

    let errorMessage = "";

    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");

    function emailRegulaments() {
        function validateEmail(email) {
            const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRules.test(email);
        }

        if (emailField.value === "") {
            errorMessage += "Por favor, preencha o email.<br>";
            emailField.style.border = "1px solid red";
        } else if (!validateEmail(emailField.value)) {
            errorMessage += "Por favor, insira um e-mail válido!<br>";
            emailField.style.border = "1px solid red";
        } else {
            emailField.style.border = "";
        }
    }

    function passwordAccount() {
        const maxPassword = 8;
        const size = passwordField.value.length;

        if (passwordField.value === "") {
            errorMessage += "Por favor, preencha sua senha.<br>";
            passwordField.style.border = "1px solid red";
        } else if (size > maxPassword) {
            errorMessage += `A senha deve ter no máximo ${maxPassword} caracteres!<br>`;
            passwordField.style.border = "1px solid red";
            passwordField.value = passwordField.value.slice(0, maxPassword);
        } else {
            passwordField.style.border = "";
        }
    }
    cleanMessage();

    if (confirmPasswordField.value === "") {
        errorMessage += "Por favor, confirme sua senha.<br>";
        confirmPasswordField.style.border = "1px solid red";
    } else {
        confirmPasswordField.style.border = "";
    }
    cleanMessage();
    if (passwordField.value && confirmPasswordField.value) {
        if (passwordField.value !== confirmPasswordField.value) {
            errorMessage += "As senhas não correspondem!<br>";
            passwordField.style.border = "1px solid red";
            confirmPasswordField.style.border = "1px solid red";
        } else {
            passwordField.style.border = "";
            confirmPasswordField.style.border = "";
        }
    }
    cleanMessage();


    emailRegulaments();
    passwordAccount();

    const errorDiv = document.getElementById("error-message");
    if (errorMessage !== "") {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = errorMessage;
    } else {
        errorDiv.style.display = "none";
        window.location.href = "/tela_login/index.html";
    }

    cleanMessage();
});

function cleanMessage() {
    setTimeout(function () {
        const errorDiv = document.getElementById("error-message");
        errorDiv.style.display = "none";
    }, 4000);
}

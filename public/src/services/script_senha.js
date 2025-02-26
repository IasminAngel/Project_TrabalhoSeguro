// Adiciona um evento de clique ao botão com o ID "confirm"
document.getElementById("confirm").addEventListener("click", function (event) {
    event.preventDefault(); // Evita que o formulário seja enviado automaticamente

    let errorMessage = ""; // Variável para armazenar mensagens de erro

    // Seleciona os campos de e-mail, senha e confirmação de senha
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");

    // Função para validar o e-mail
    function emailRegulaments() {
        // Função interna para verificar se o e-mail atende ao formato padrão
        function validateEmail(email) {
            const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRules.test(email); // Retorna verdadeiro se o e-mail estiver correto
        }

        if (emailField.value === "") { // Verifica se o campo de e-mail está vazio
            errorMessage += "Por favor, preencha o email.<br>";
            emailField.style.border = "1px solid red";
        } else if (!validateEmail(emailField.value)) { // Verifica se o e-mail é válido
            errorMessage += "Por favor, insira um e-mail válido!<br>";
            emailField.style.border = "1px solid red";
        } else {
            emailField.style.border = ""; // Remove o estilo de erro se o e-mail for válido
        }
    }

    // Função para validar a senha
    function passwordAccount() {
        const maxPassword = 8; // Define o comprimento máximo para a senha
        const size = passwordField.value.length;

        if (passwordField.value === "") { // Verifica se o campo de senha está vazio
            errorMessage += "Por favor, preencha sua senha.<br>";
            passwordField.style.border = "1px solid red";
        } else if (size > maxPassword) { // Verifica se a senha excede o comprimento máximo
            errorMessage += `A senha deve ter no máximo ${maxPassword} caracteres!<br>`;
            passwordField.style.border = "1px solid red";
            passwordField.value = passwordField.value.slice(0, maxPassword); // Limita o comprimento da senha ao máximo permitido
        } else {
            passwordField.style.border = ""; // Remove o estilo de erro se a senha for válida
        }
    }
    cleanMessage(); // Limpa a mensagem de erro após um curto intervalo

    // Verifica se o campo de confirmação de senha está vazio
    if (confirmPasswordField.value === "") {
        errorMessage += "Por favor, confirme sua senha.<br>";
        confirmPasswordField.style.border = "1px solid red";
    } else {
        confirmPasswordField.style.border = "";
    }
    cleanMessage();

    // Verifica se a senha e a confirmação correspondem
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

    // Chama as funções de validação de e-mail e senha
    emailRegulaments();
    passwordAccount();

    // Exibe as mensagens de erro, se houver
    const errorDiv = document.getElementById("error-message");
    if (errorMessage !== "") {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = errorMessage;
    } else {
        errorDiv.style.display = "none";
        window.location.href = "/public/src/pages/login/login.html"; // Redireciona o usuário para a tela de login
    }

    cleanMessage(); // Limpa a mensagem de erro após um curto intervalo
});

// Função para ocultar a mensagem de erro após 4 segundos
function cleanMessage() {
    setTimeout(function () {
        const errorDiv = document.getElementById("error-message");
        errorDiv.style.display = "none";
    }, 4000);
}

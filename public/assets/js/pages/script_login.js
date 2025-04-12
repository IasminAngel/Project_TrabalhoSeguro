document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let errorMessage = "";
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const errorDiv = document.getElementById("error-message");

    emailField.classList.remove("error");
    passwordField.classList.remove("error");
    errorDiv.style.display = "none";

    function validateEmail(email) {
      const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRules.test(email);
    }

    if (emailField.value === "") {
      errorMessage += "Por favor, preencha o email.<br>";
      emailField.classList.add("error");
    } else if (!validateEmail(emailField.value)) {
      errorMessage += "Por favor, insira um e-mail válido!<br>";
      emailField.classList.add("error");
    }

    const maxPassword = 8;
    const size = passwordField.value.length;

    if (passwordField.value === "") {
      errorMessage += "Por favor, preencha sua senha.<br>";
      passwordField.classList.add("error");
    } else if (size > maxPassword) {
      errorMessage += `A senha deve ter no máximo ${maxPassword} caracteres!<br>`;
      passwordField.classList.add("error");
      passwordField.value = passwordField.value.slice(0, maxPassword);
    }

    if (errorMessage !== "") {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = errorMessage;
      
      setTimeout(function() {
        errorDiv.style.display = "none";
      }, 4000);
    } else {
      console.log("Login válido, redirecionando...");
      window.location.href = "/public/src/pages/option/index_option.html";
    }
  });
});
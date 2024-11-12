// Adiciona um evento de clique ao botão com o ID "continue"
document.getElementById("continue").addEventListener("click", function (event) {
  event.preventDefault(); // Evita o envio automático do formulário

  let errorMessage = ""; // Variável para armazenar mensagens de erro

  // Seleciona os campos do formulário
  const firstnameField = document.getElementById("firstname");
  const lastnameField = document.getElementById("lastname");
  const emailField = document.getElementById("email");
  const celularField = document.getElementById("number");
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirmpassword");
  const genderFields = document.getElementsByName("gender");

  let genderSelected = false; // Variável para verificar se o gênero foi selecionado

  // Verifica se o campo de nome está preenchido
  if (firstnameField.value === "") {
      errorMessage += "Por favor, preencha o nome.<br>";
      firstnameField.style.border = "1px solid red";
  } else {
      firstnameField.style.border = "";
  }
  cleanMessage();

  // Função para validação de e-mail
  function emailRegulaments() {
      function validateEmail(email) {
          const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o e-mail
          return emailRules.test(email); // Retorna verdadeiro se o e-mail for válido
      }

      if (emailField.value === "") { // Verifica se o e-mail está preenchido
          errorMessage += "Por favor, preencha o email.<br>";
          emailField.style.border = "1px solid red";
      } else if (!validateEmail(emailField.value)) { // Verifica se o e-mail é válido
          errorMessage += "Por favor, insira um e-mail válido!<br>";
          emailField.style.border = "1px solid red";
      } else {
          emailField.style.border = "";
      }
  }
  emailRegulaments();
  cleanMessage();

  // Verifica se o campo de sobrenome está preenchido
  if (lastnameField.value === "") {
      errorMessage += "Por favor, preencha o sobrenome.<br>";
      lastnameField.style.border = "1px solid red";
  } else {
      lastnameField.style.border = "";
  }

  // Limite de caracteres para o número de celular
  const maxPhone = 9;
  const sizePhone = celularField.value.length;

  if (celularField.value === "") { // Verifica se o número de celular está preenchido
      errorMessage += "Por favor, preencha o seu número de celular.<br>";
      celularField.style.border = "1px solid red";
  } else if (sizePhone > maxPhone) { // Verifica o comprimento do número de celular
      errorMessage += `O número de telefone deve ter no máximo ${maxPhone} caracteres!<br>`;
      celularField.style.border = "1px solid red";
      celularField.value = celularField.value.slice(0, maxPhone); // Limita o comprimento do número
  } else {
      celularField.style.border = "";
  }
  cleanMessage();

  const maxPassword = 8; // Define o comprimento máximo da senha

  // Função para validar o campo de senha
  function passwordAccount() {
      if (passwordField.value === "") { // Verifica se a senha está preenchida
          errorMessage += "Por favor, preencha sua senha.<br>";
          passwordField.style.border = "1px solid red";
      } else if (passwordField.value.length > maxPassword) { // Verifica o comprimento da senha
          errorMessage += `A senha deve ter no máximo ${maxPassword} caracteres!<br>`;
          passwordField.style.border = "1px solid red";
          passwordField.value = passwordField.value.slice(0, maxPassword);
      } else {
          passwordField.style.border = "";
      }
  }
  passwordAccount();
  cleanMessage();

  // Verifica se o campo de confirmação de senha está preenchido
  if (confirmPasswordField.value === "") {
      errorMessage += "Por favor, confirme sua senha.<br>";
      confirmPasswordField.style.border = "1px solid red";
  } else {
      confirmPasswordField.style.border = "";
  }
  cleanMessage();

  // Verifica se as senhas são iguais
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

  // Verifica se algum gênero foi selecionado
  genderFields.forEach(function (field) {
      if (field.checked) {
          genderSelected = true;
      }
  });

  if (!genderSelected) {
      errorMessage += "Por favor, selecione um gênero.<br>";
  }
  cleanMessage();

  // Exibe as mensagens de erro, se houver
  const errorDiv = document.getElementById("error-message");
  if (errorMessage !== "") {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = errorMessage;
  } else {
      errorDiv.style.display = "none";
      showPopup(); // Exibe o popup de confirmação
  }
});
cleanMessage();

// Função para exibir o popup de confirmação de cadastro
function showPopup() {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.innerHTML = "Cadastro Concluído!";
  popup.style.display = "flex";

  // Após 2 segundos, redireciona o usuário e fecha o popup
  setTimeout(function () {
      window.location.href = "/tela_login/index.html";
      popup.style.display = "none";
  }, 2000);

  // Fecha o popup ao clicar no botão de fechar
  document.getElementById("closeBtn").onclick = function () {
      popup.style.display = "none";
  };

  // Fecha o popup ao clicar fora dele
  window.onclick = function (event) {
      if (event.target == popup) {
          popup.style.display = "none";
      }
  };
}

cleanMessage(); // Função para limpar mensagens

// Função para ocultar a mensagem de erro após 4 segundos
function cleanMessage() {
  setTimeout(function () {
      const errorDiv = document.getElementById("error-message");
      errorDiv.style.display = "none";
  }, 4000);
}

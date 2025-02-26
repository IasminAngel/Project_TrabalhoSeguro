// Adiciona um evento de clique ao botão com o ID "entrar"
document.getElementById("entrar").addEventListener("click", function (event) {
  event.preventDefault(); // Impede o envio do formulário ao clicar no botão

  let errorMessage = ""; // Variável para armazenar mensagens de erro

  // Seleciona os campos de e-mail e senha do formulário
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  // Função para validar o campo de e-mail
  function emailRegulaments() {
      // Função para verificar se o e-mail tem um formato válido
      function validateEmail(email) {
          const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para e-mail válido
          return emailRules.test(email); // Retorna verdadeiro se o e-mail for válido
      }

      if (emailField.value === "") { // Verifica se o e-mail está preenchido
          errorMessage += "Por favor, preencha o email.<br>";
          emailField.style.border = "1px solid red"; // Adiciona borda vermelha para indicar erro
      } else if (!validateEmail(emailField.value)) { // Verifica se o e-mail é válido
          errorMessage += "Por favor, insira um e-mail válido!<br>";
          emailField.style.border = "1px solid red";
      } else {
          emailField.style.border = ""; // Remove borda vermelha se o e-mail for válido
      }
  }

  // Função para validar o campo de senha
  function passwordAccount() {
      const maxPassword = 8; // Define o comprimento máximo da senha
      const size = passwordField.value.length;

      if (passwordField.value === "") { // Verifica se a senha está preenchida
          errorMessage += "Por favor, preencha sua senha.<br>";
          passwordField.style.border = "1px solid red";
      } else if (size > maxPassword) { // Verifica se a senha tem o comprimento permitido
          errorMessage += `A senha deve ter no máximo ${maxPassword} caracteres!<br>`;
          passwordField.style.border = "1px solid red";
          passwordField.value = passwordField.value.slice(0, maxPassword); // Limita o comprimento da senha
      } else {
          passwordField.style.border = ""; // Remove borda vermelha se a senha for válida
      }
  }

  // Chama as funções de validação para e-mail e senha
  emailRegulaments();  
  passwordAccount(); 

  // Seleciona o elemento de mensagem de erro e exibe as mensagens, se houver
  const errorDiv = document.getElementById("error-message");
  if (errorMessage !== "") { // Se há erros, exibe as mensagens no elemento de erro
      errorDiv.style.display = "block";
      errorDiv.innerHTML = errorMessage;
  } else {
      errorDiv.style.display = "none"; // Esconde o elemento de erro se não houver mensagens
      window.location.replace("/index.html");
 // Redireciona para a página principal
  }

  cleanMessage(); // Chama a função para limpar mensagens após um tempo
});

// Função para ocultar a mensagem de erro após 4 segundos
function cleanMessage() {
  setTimeout(function () {
      const errorDiv = document.getElementById("error-message");
      errorDiv.style.display = "none"; // Esconde a mensagem de erro
  }, 4000);
}

document.getElementById("continue").addEventListener("click", function(event) {
    event.preventDefault();
    
    let errorMessage = "";
    
    const firstnameField = document.getElementById("firstname");
    const lastnameField = document.getElementById("lastname");
    const emailField = document.getElementById("email");
    const celularField = document.getElementById("number");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmpassword");
    
    // Validação de nome
    if (firstnameField.value === "") {
      errorMessage += "Por favor, preencha o nome.<br>";
      firstnameField.style.border = "1px solid red";
    } else {
      firstnameField.style.border = "";
    }
    
    // Validação de sobrenome
    if (lastnameField.value === "") {
      errorMessage += "Por favor, preencha o sobrenome.<br>";
      lastnameField.style.border = "1px solid red";
    } else {
      lastnameField.style.border = "";
    }
    
    // Validação de email
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
    
    // Validação de celular
    const maxPhone = 9;
    const sizePhone = celularField.value.length;
    
    if (celularField.value === "") {
      errorMessage += "Por favor, preencha o seu número de celular.<br>";
      celularField.style.border = "1px solid red";
    } else if (sizePhone > maxPhone) {
      errorMessage += `O número de telefone deve ter no máximo ${maxPhone} caracteres!<br>`;
      celularField.style.border = "1px solid red";
      celularField.value = celularField.value.slice(0, maxPhone);
    } else {
      celularField.style.border = "";
    }
    
    // Validação de senha
    const maxPassword = 8;
    
    if (passwordField.value === "") {
      errorMessage += "Por favor, preencha sua senha.<br>";
      passwordField.style.border = "1px solid red";
    } else if (passwordField.value.length > maxPassword) {
      errorMessage += `A senha deve ter no máximo ${maxPassword} caracteres!<br>`;
      passwordField.style.border = "1px solid red";
      passwordField.value = passwordField.value.slice(0, maxPassword);
    } else {
      passwordField.style.border = "";
    }
    
    // Validação de confirmação de senha
    if (confirmPasswordField.value === "") {
      errorMessage += "Por favor, confirme sua senha.<br>";
      confirmPasswordField.style.border = "1px solid red";
    } else {
      confirmPasswordField.style.border = "";
    }
    
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
    
    // Exibir mensagens de erro ou sucesso
    const errorDiv = document.getElementById("error-message");
    if (errorMessage !== "") {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = errorMessage;
      
      // Limpar mensagem após 4 segundos
      setTimeout(function() {
        errorDiv.style.display = "none";
      }, 4000);
    } else {
      errorDiv.style.display = "none";
      showPopup();
    }
  });
  
  function showPopup() {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    
    popupMessage.innerHTML = "Cadastro Concluído!";
    popup.style.display = "flex";
    
    setTimeout(function() {
      window.location.href = "/tela_login/index.html";
      popup.style.display = "none";
    }, 2000);
    
    document.getElementById("closeBtn").onclick = function() {
      popup.style.display = "none";
    };
    
    window.onclick = function(event) {
      if (event.target == popup) {
        popup.style.display = "none";
      }
    };
  }
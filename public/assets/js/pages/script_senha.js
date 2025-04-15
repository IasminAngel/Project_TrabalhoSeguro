document.getElementById("confirm").addEventListener("click", async function (event) {
    event.preventDefault();
  
    let errorMessage = "";
  
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");
  
    function validateEmail(email) {
      const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRules.test(email);
    }
  
    // Validações
    if (!emailField.value || !validateEmail(emailField.value)) {
      errorMessage += "Insira um email válido.<br>";
      emailField.style.border = "1px solid red";
    } else {
      emailField.style.border = "";
    }
  
    const senha = passwordField.value;
    const confirmarSenha = confirmPasswordField.value;
  
    if (!senha || senha.length > 8) {
      errorMessage += "A senha deve ter até 8 caracteres.<br>";
      passwordField.style.border = "1px solid red";
    } else {
      passwordField.style.border = "";
    }
  
    if (senha !== confirmarSenha) {
      errorMessage += "As senhas não correspondem!<br>";
      confirmPasswordField.style.border = "1px solid red";
    } else {
      confirmPasswordField.style.border = "";
    }
  
    const errorDiv = document.getElementById("error-message");
    if (errorMessage !== "") {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = errorMessage;
      setTimeout(() => (errorDiv.style.display = "none"), 4000);
      return;
    }
  
    // Envia para backend
    try {
      const response = await fetch('/alterar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailField.value,
          novaSenha: senha
        })
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert("Senha redefinida com sucesso!");
        window.location.href = "/login";
      } else {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = result.error || "Erro ao redefinir a senha.";
      }
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      errorDiv.style.display = "block";
      errorDiv.innerHTML = "Erro de conexão com o servidor.";
    }
  });
  
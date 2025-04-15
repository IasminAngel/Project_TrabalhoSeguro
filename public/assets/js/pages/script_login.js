document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("error-message");

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(message, field = null) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    
    if (field) {
      field.classList.add("error");
      field.focus();
    }
    
    setTimeout(() => {
      errorDiv.style.display = "none";
      if (field) field.classList.remove("error");
    }, 4000);
  }

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    
    // Validações frontend
    if (!email) return showError("Por favor, preencha o email.", document.getElementById("email"));
    if (!validateEmail(email)) return showError("Por favor, insira um e-mail válido!", document.getElementById("email"));
    if (!password) return showError("Por favor, preencha sua senha.", document.getElementById("password"));
    
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erro no login');
      }
      
      if (!data.token || !data.user) {
        throw new Error('Dados de autenticação ausentes');
      }
      
      // Armazena os dados
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redireciona
      window.location.href = "/dashboard";

    } catch (error) {
      console.error('Erro no login:', error);
      showError(error.message || 'Erro durante o login. Tente novamente.');
    }
  });
});
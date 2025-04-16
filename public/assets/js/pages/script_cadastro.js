document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastroForm");
  const continueBtn = document.getElementById("continue");
  const errorDiv = document.getElementById("error-message");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return re.test(phone);
  }

  function formatPhone(input) {
    let value = input.value.replace(/\D/g, "");
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 0) {
      value = `(${value.substring(0, 2)}) ${value.substring(
        2,
        7
      )}-${value.substring(7)}`;
    }
    input.value = value;
  }

  document.getElementById("number").addEventListener("input", function () {
    formatPhone(this);
  });

  continueBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    let isValid = true;
    let errorMessage = "";

    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => (input.style.border = ""));
    errorDiv.style.display = "none";

    const fields = [
      { id: "firstname", name: "Primeiro Nome", min: 2 },
      { id: "lastname", name: "Sobrenome", min: 2 },
      { id: "email", name: "E-mail", type: "email" },
      { id: "number", name: "Celular", type: "phone" },
      { id: "password", name: "Senha", min: 6, max: 20 },
      { id: "confirmpassword", name: "Confirmação de Senha" },
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const value = input.value.trim();

      if (!value) {
        errorMessage += `Por favor, preencha o ${field.name}.<br>`;
        input.style.border = "1px solid red";
        isValid = false;
      } else if (field.min && value.length < field.min) {
        errorMessage += `${field.name} deve ter no mínimo ${field.min} caracteres.<br>`;
        input.style.border = "1px solid red";
        isValid = false;
      } else if (field.max && value.length > field.max) {
        errorMessage += `${field.name} deve ter no máximo ${field.max} caracteres.<br>`;
        input.style.border = "1px solid red";
        isValid = false;
      } else if (field.type === "email" && !validateEmail(value)) {
        errorMessage += `Por favor, insira um ${field.name} válido.<br>`;
        input.style.border = "1px solid red";
        isValid = false;
      } else if (field.type === "phone" && !validatePhone(value)) {
        errorMessage += `Por favor, insira um ${field.name} válido (formato: (XX) XXXXX-XXXX).<br>`;
        input.style.border = "1px solid red";
        isValid = false;
      }
    });

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;

    if (password && confirmPassword && password !== confirmPassword) {
      errorMessage += "As senhas não coincidem.<br>";
      document.getElementById("password").style.border = "1px solid red";
      document.getElementById("confirmpassword").style.border = "1px solid red";
      isValid = false;
    }

    if (!isValid) {
      errorDiv.innerHTML = errorMessage;
      errorDiv.style.display = "block";
      cleanMessage();
      return;
    }

    try {
      const response = await fetch("/api/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: document.getElementById("firstname").value.trim(),
          sobrenome: document.getElementById("lastname").value.trim(),
          email: document.getElementById("email").value.trim(),
          celular: document.getElementById("number").value.trim(),
          senha: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar usuário");
      }

      showSuccessAlert("Oba!", "Cadastro realizado com sucesso!", "/login");
    } catch (error) {
      console.error("Erro:", error);
      errorDiv.innerHTML = error.message || "Erro ao processar cadastro";
      errorDiv.style.display = "block";
    }
  });
});

function cleanMessage() {
  setTimeout(function () {
    const errorDiv = document.getElementById("error-message");
    errorDiv.style.display = "none";
  }, 4000);
}

document.getElementById("entrar").addEventListener("click", function (event) {
  event.preventDefault();

  let errorMessage = "";

  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

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

  emailRegulaments();
  passwordAccount();

  const errorDiv = document.getElementById("error-message");
  if (errorMessage !== "") {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = errorMessage;
  } else {
    errorDiv.style.display = "none";
    setTimeout(function () {
      window.location.replace("/public/src/pages/option/index_option.html");
    }, 1000);
  }

  cleanMessage();

  function cleanMessage() {
    setTimeout(function () {
      const errorDiv = document.getElementById("error-message");
      errorDiv.style.display = "none";
    }, 4000);
  }

  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailField.value,
      password: passwordField.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = ""; // rederecionar aplicativo ou site
      }
    });
});

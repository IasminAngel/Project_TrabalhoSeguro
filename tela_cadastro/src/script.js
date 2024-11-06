document.getElementById("continue").addEventListener("click", function (event) {
  event.preventDefault();

  let errorMessage = "";

  const firstnameField = document.getElementById("firstname");
  const lastnameField = document.getElementById("lastname");
  const emailField = document.getElementById("email");
  const celularField = document.getElementById("number");
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirmpassword");
  const genderFields = document.getElementsByName("gender");

  let genderSelected = false;

  if (firstnameField.value === "") {
    errorMessage += "Por favor, preencha o nome.<br>";
    firstnameField.style.border = "1px solid red";
  } else {
    firstnameField.style.border = "";
  }
  cleanMessage();
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
  emailRegulaments();
  cleanMessage();
  if (lastnameField.value === "") {
    errorMessage += "Por favor, preencha o sobrenome.<br>";
    lastnameField.style.border = "1px solid red";
  } else {
    lastnameField.style.border = "";
  }

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
  cleanMessage();
  const maxPassword = 8;

  function passwordAccount() {
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
  }
  passwordAccount();
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
  genderFields.forEach(function (field) {
    if (field.checked) {
      genderSelected = true;
    }
  });

  if (!genderSelected) {
    errorMessage += "Por favor, selecione um gênero.<br>";
  }
  cleanMessage();
  const errorDiv = document.getElementById("error-message");
  if (errorMessage !== "") {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = errorMessage;
  } else {
    errorDiv.style.display = "none";
    showPopup();
  }
});
cleanMessage(); 

function showPopup() {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.innerHTML = "Cadastro Concluído!";
  popup.style.display = "flex";

  setTimeout(function () {
    window.location.href = "/tela_login/index.html";
    popup.style.display = "none";
  }, 2000);


  document.getElementById("closeBtn").onclick = function () {
    popup.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  };
}

cleanMessage(); 

function cleanMessage() {
  setTimeout(function () {
    const errorDiv = document.getElementById("error-message");
    errorDiv.style.display = "none";
  }, 4000);
}
var stars = document.querySelectorAll(".star-icon");

document.addEventListener("click", function (e) {
  var classStar = e.target.classList;
  if (!classStar.contains("ativo")) {
    stars.forEach(function (star) {
      star.classList.remove("ativo");
    });
    classStar.add("ativo");
    console.log(e.target.getAttribute("data-avaliacao"));
  }
});

document.getElementById("send").addEventListener("click", function (event) {
  event.preventDefault();

  let errorMessage = "";

  const opinionField = document.querySelector(".opinion");
  const upgradeField = document.querySelector(".upgrade");

  if (opinionField.value === "") {
    errorMessage += "Por favor, preencha sua opinião.<br>";
    opinionField.style.border = "1px solid red";
    cleanMessage();
  } else {
    opinionField.style.border = "";
  }

  if (upgradeField.value === "") {
    errorMessage += "Por favor, preencha o que deseja que melhoremos.<br>";
    upgradeField.style.border = "1px solid red";
    cleanMessage();
  } else {
    upgradeField.style.border = "";
  }


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

function cleanMessage() {
  setTimeout(function () {
    const errorDiv = document.getElementById("error-message");
    errorDiv.style.display = "none";
  }, 4000);
}

function showPopup() {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  popupMessage.innerHTML = "Agradecemos pela avaliação !";
  popup.style.display = "flex";

  document.getElementById("closeBtn").onclick = function () {
    popup.style.display = "none";
    window.location.href = "/blog_principal/index.html";
  };

  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  };
}


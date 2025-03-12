// Seleciona todos os elementos com a classe .star-icon (ícones de estrela)
var stars = document.querySelectorAll(".star-icon");

// Adiciona um listener de evento para o clique em todo o documento
document.addEventListener("click", function (e) {
  // Verifica se o elemento clicado possui a classe "ativo"
  var classStar = e.target.classList;
  if (!classStar.contains("ativo")) {
    // Remove a classe "ativo" de todas as estrelas para garantir que apenas uma esteja ativa
    stars.forEach(function (star) {
      star.classList.remove("ativo");
    });
    // Adiciona a classe "ativo" à estrela clicada
    classStar.add("ativo");
    // Exibe a avaliação atribuída no console (o valor está armazenado no atributo data-avaliacao)
    console.log(e.target.getAttribute("data-avaliacao"));
  }
});

// Adiciona um listener de evento ao botão de envio
document.getElementById("send").addEventListener("click", function (event) {
  // Evita o comportamento padrão do botão (submeter o formulário)
  event.preventDefault();

  // Inicializa a mensagem de erro como vazia
  let errorMessage = "";

  // Seleciona os campos de opinião e sugestão de melhorias
  const opinionField = document.querySelector(".opinion");
  const upgradeField = document.querySelector(".upgrade");

  // Verifica se o campo de opinião está vazio e exibe uma mensagem de erro, se necessário
  if (opinionField.value === "") {
    errorMessage += "Por favor, preencha sua opinião.<br>";
    opinionField.style.border = "1px solid red"; // Destaca o campo em vermelho
    cleanMessage(); // Limpa a mensagem de erro após um tempo
  } else {
    opinionField.style.border = ""; // Remove o destaque vermelho se o campo estiver preenchido
  }

  // Verifica se o campo de melhorias está vazio e exibe uma mensagem de erro, se necessário
  if (upgradeField.value === "") {
    errorMessage += "Por favor, preencha o que deseja que melhoremos.<br>";
    upgradeField.style.border = "1px solid red"; // Destaca o campo em vermelho
    cleanMessage(); // Limpa a mensagem de erro após um tempo
  } else {
    upgradeField.style.border = ""; // Remove o destaque vermelho se o campo estiver preenchido
  }

  // Exibe as mensagens de erro, se houver, ou mostra o popup de confirmação
  const errorDiv = document.getElementById("error-message");
  if (errorMessage !== "") {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = errorMessage;
  } else {
    errorDiv.style.display = "none";
    showPopup(); // Mostra o popup de agradecimento se não houver erros
  }
});

// Função para limpar a mensagem de erro após um tempo
function cleanMessage() {
  setTimeout(function () {
    const errorDiv = document.getElementById("error-message");
    errorDiv.style.display = "none";
  }, 4000); // Oculta a mensagem de erro após 4 segundos
}

// Função para mostrar o popup de agradecimento
function showPopup() {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  // Define a mensagem de agradecimento no popup e o exibe
  popupMessage.innerHTML = "Agradecemos pela avaliação !";
  popup.style.display = "flex";

  // Configura o botão de fechar para ocultar o popup e redirecionar o usuário
  document.getElementById("closeBtn").onclick = function () {
    popup.style.display = "none";
    window.location.replace("/index.html"); // Redireciona para a página inicial
  };

  // Fecha o popup ao clicar fora do conteúdo do popup
  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  };
}

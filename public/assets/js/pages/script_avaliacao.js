document.addEventListener("DOMContentLoaded", function() {
  const stars = document.querySelectorAll(".star-icon");
  const form = document.getElementById("form");
  const sendButton = document.getElementById("send");
  const opinionField = document.querySelector(".opinion");
  const upgradeField = document.querySelector(".upgrade");
  const errorDiv = document.getElementById("error-message");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  
  let selectedRating = 0;

  // Sistema de seleção de estrelas
  stars.forEach(star => {
    star.addEventListener("click", function() {
      const rating = parseInt(this.getAttribute("data-avaliacao"));
      
      // Se clicar na mesma estrela, desmarca
      if (selectedRating === rating) {
        selectedRating = 0;
      } else {
        selectedRating = rating;
      }
      
      updateStars();
      console.log("Avaliação selecionada:", selectedRating);
    });
  });

  function updateStars() {
    stars.forEach((star, index) => {
      if (index < selectedRating) {
        star.classList.add("ativo");
      } else {
        star.classList.remove("ativo");
      }
    });
  }

  // Envio do formulário
  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const response = await submitEvaluation();
      showPopup(response.message || "Avaliação enviada com sucesso!");
      resetForm();
    } catch (error) {
      console.error("Erro:", error);
      showError(error.message || "Erro ao enviar avaliação");
    }
  });

  function validateForm() {
    if (selectedRating === 0) {
      showError("Por favor, selecione uma avaliação");
      return false;
    }
    
    if (!opinionField.value.trim()) {
      showError("Por favor, digite sua opinião");
      opinionField.style.border = "1px solid red";
      return false;
    }
    
    return true;
  }

  async function submitEvaluation() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Usuário não autenticado");

    const response = await fetch("/api/avaliacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        estrela: selectedRating,
        opiniao: opinionField.value.trim(),
        melhoras: upgradeField.value.trim() || null
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }

  function resetForm() {
    selectedRating = 0;
    updateStars();
    opinionField.value = "";
    upgradeField.value = "";
  }

  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    setTimeout(() => errorDiv.style.display = "none", 4000);
  }

  function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
    
    document.getElementById("closeBtn").onclick = function() {
      popup.style.display = "none";
      if (message.includes("sucesso")) {
        window.location.href = "/main";
      }
    };
  }
});
document.addEventListener("DOMContentLoaded", function () {

    const stars = document.querySelectorAll(".star-icon");
    const form = document.getElementById("form");
    const sendButton = document.getElementById("send");
    const opinionField = document.querySelector(".opinion");
    const upgradeField = document.querySelector(".upgrade");
    const errorDiv = document.getElementById("error-message");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    
    let selectedRating = 0;
  
    stars.forEach((star) => {
      star.addEventListener("click", function () {
        selectedRating = parseInt(this.getAttribute("data-avaliacao"));
        updateStarsVisual();
      });
    });
  
    function updateStarsVisual() {
      stars.forEach((s, i) => {
        s.classList.toggle("ativo", i < selectedRating);
      });
    }
  
    // Validação em tempo real
    opinionField.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.style.border = "";
        hideError();
      }
    });
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      if (!validateForm()) return;
  
      const formData = prepareFormData();
      
      try {
        const response = await submitEvaluation(formData);
        handleSuccess(response);
      } catch (error) {
        handleError(error);
      }
    }
  
    // Funções auxiliares
    function validateForm() {
      let isValid = true;
      let errorMessage = "";
  
      if (selectedRating === 0) {
        errorMessage += "Por favor, selecione uma avaliação com as estrelas.<br>";
        isValid = false;
      }
  
      if (!opinionField.value.trim()) {
        errorMessage += "Por favor, preencha sua opinião.<br>";
        opinionField.style.border = "1px solid red";
        isValid = false;
      }
  
      if (!isValid) {
        showError(errorMessage);
      }
  
      return isValid;
    }
  
    function prepareFormData() {
      return {
        estrela: selectedRating,
        opiniao: opinionField.value.trim(),
        melhoras: upgradeField.value.trim() || null
      };
    }
  
    async function submitEvaluation(formData) {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Usuário não autenticado");
      }
  
      const response = await fetch("/api/evaluations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao enviar avaliação");
      }
  
      return response.json();
    }
  
    function handleSuccess(data) {
      showPopup(data.message || "Avaliação enviada com sucesso!");
      resetForm();
    }
  
    function handleError(error) {
      console.error("Erro:", error);
      showError(error.message || "Erro ao enviar avaliação");
    }
  
    function resetForm() {
      stars.forEach(star => star.classList.remove("ativo"));
      opinionField.value = "";
      upgradeField.value = "";
      selectedRating = 0;
    }
  
    function showError(message) {
      errorDiv.innerHTML = message;
      errorDiv.style.display = "block";
      setTimeout(hideError, 4000);
    }
  
    function hideError() {
      errorDiv.style.display = "none";
    }
  
    function showPopup(message) {
      popupMessage.textContent = message;
      popup.style.display = "flex";
  
      const closePopup = () => {
        popup.style.display = "none";
        window.removeEventListener('click', outsideClick);
        // Redireciona apenas se for sucesso
        if (message.includes("sucesso")) {
          window.location.href = "/index.html";
        }
      };
  
      const outsideClick = (event) => {
        if (event.target === popup) {
          closePopup();
        }
      };
  
      document.getElementById("closeBtn").onclick = closePopup;
      window.addEventListener('click', outsideClick);
    }
  
    // Event listeners
    form.addEventListener("submit", handleSubmit);
    sendButton.addEventListener("click", handleSubmit);
  });
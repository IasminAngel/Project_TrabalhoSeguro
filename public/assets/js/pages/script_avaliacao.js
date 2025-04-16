document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star-icon");
  const form = document.getElementById("form");
  const opinionField = document.querySelector(".opinion");
  const upgradeField = document.querySelector(".upgrade");
  const errorDiv = document.getElementById("error-message");

  let selectedRating = 0;

  function validateForm() {
    let isValid = true;
    let errorMessage = "";

    errorDiv.innerHTML = "";
    opinionField.classList.remove("error");
    upgradeField.classList.remove("error");

    if (selectedRating === 0) {
      errorMessage += "Por favor, selecione uma avaliação com as estrelas.<br>";
      isValid = false;
    }

    if (!opinionField.value.trim()) {
      errorMessage += "Por favor, preencha sua opinião.<br>";
      opinionField.classList.add("error");
      isValid = false;
    }

    if (!upgradeField.value.trim()) {
    }

    if (!isValid) {
      showError(errorMessage);
    }

    return isValid;
  }

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const rating = parseInt(this.getAttribute("data-avaliacao"));
      selectedRating = selectedRating === rating ? 0 : rating;
      updateStars();
      console.log("Avaliação selecionada:", selectedRating);
    });

    star.addEventListener("mouseenter", function () {
      if (!this.classList.contains("ativo")) {
        this.classList.add("hover");
      }
    });

    star.addEventListener("mouseleave", function () {
      this.classList.remove("hover");
    });
  });

  function updateStars() {
    stars.forEach((star, index) => {
      star.classList.toggle("ativo", index < selectedRating);
      star.classList.remove("hover");
    });
  }

  async function submitEvaluation() {
    try {
      const response = await fetch("/api/avaliacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estrela: selectedRating,
          opiniao: opinionField.value.trim(),
          melhoras: upgradeField.value.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Erro ${response.status}: ${response.statusText}`
        );
      }

      return data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  }

  function showError(message) {
    errorDiv.innerHTML = message;
    errorDiv.style.display = "block";
    setTimeout(hideError, 5000);
  }

  function resetForm() {
    selectedRating = 0;
    updateStars();
    opinionField.value = "";
    upgradeField.value = "";
    hideError();
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        await submitEvaluation();
        showSuccessAlert("Oba!", "Avaliação enviada com sucesso!", "main");
        resetForm();
      } catch (error) {
        showError(
          error.message || "Erro ao enviar avaliação. Tente novamente."
        );
      }
    }
  });

  opinionField.addEventListener("input", function () {
    if (this.value.trim()) {
      this.classList.remove("error");
      hideError();
    }
  });

  function hideError() {
    errorDiv.style.display = "none";
  }
});

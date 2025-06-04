
const precoMensal = "R$ 20,90/mês";
const precoAnual = "R$ 49,90/ano";


function init() {
  const mensalElement = document.getElementById("mensalPrice");
  const anualElement = document.getElementById("anualPrice");
  
  if (mensalElement) mensalElement.textContent = precoMensal;
  if (anualElement) anualElement.textContent = precoAnual;

  setupVideoHandlers();
}

function setupVideoHandlers() {
  document.querySelectorAll(".dish").forEach((dish) => {
    const openButton = dish.querySelector(".openVideo");
    const closeButton = dish.querySelector(".closeVideo");
    const videoContainer = dish.querySelector(".videoContainer");

    if (openButton && closeButton && videoContainer) {
      openButton.addEventListener("click", () => {
        videoContainer.classList.remove("hidden");
      });

      closeButton.addEventListener("click", () => {
        videoContainer.classList.add("hidden");
      });
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
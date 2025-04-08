const precoMensal = "25 R$ /mês";
const precoAnual = "120 R$ /mês";

document.getElementById("mensalPrice").textContent = precoMensal;
document.getElementById("anualPrice").textContent = precoAnual;

document.querySelectorAll(".dish").forEach((dish) => {
  const openButton = dish.querySelector(".openVideo");
  const closeButton = dish.querySelector(".closeVideo");
  const videoContainer = dish.querySelector(".videoContainer");

  openButton.addEventListener("click", () => {
    videoContainer.classList.remove("hidden");
  });

  closeButton.addEventListener("click", () => {
    videoContainer.classList.add("hidden");
  });
});


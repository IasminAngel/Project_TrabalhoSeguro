console.log("FUNCIONANDO");
document.addEventListener("DOMContentLoaded", function () {
  // Controle do EPI
  const epiSim = document.getElementById("epiSim");
  const epiNao = document.getElementById("epiNao");
  const epiContainer = document.getElementById("epiContainer");

  epiSim.addEventListener("change", () => {
    epiContainer.classList.remove("hidden");
  });

  epiNao.addEventListener("change", () => {
    epiContainer.classList.add("hidden");
  });

  // Controle de acidentes anteriores
  const acidentesAnteriores = document.querySelectorAll(
    'input[name="acidentes_anteriores"]'
  );
  const quantidadeAcidentesContainer = document.getElementById(
    "quantidadeAcidentesContainer"
  );

  acidentesAnteriores.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "sim" && radio.checked) {
        quantidadeAcidentesContainer.classList.remove("hidden");
      } else if (radio.value === "nao" && radio.checked) {
        quantidadeAcidentesContainer.classList.add("hidden");
      }
    });
  });

  // Controle de testemunhas
  const testemunhaSim = document.getElementById("testemunhaSim");
  const testemunhaNao = document.getElementById("testemunhaNao");
  const testemunhaContainer = document.getElementById("testemunhaContainer");

  testemunhaSim.addEventListener("change", () => {
    testemunhaContainer.classList.remove("hidden");
  });

  testemunhaNao.addEventListener("change", () => {
    testemunhaContainer.classList.add("hidden");
  });

  // Controle de afastamento
  const afastamentoSim = document.getElementById("afastamentoSim");
  const afastamentoNao = document.getElementById("afastamentoNao");
  const diasAfastamentoContainer = document.getElementById(
    "diasAfastamentoContainer"
  );

  afastamentoSim.addEventListener("change", () => {
    diasAfastamentoContainer.classList.remove("hidden");
  });

  afastamentoNao.addEventListener("change", () => {
    diasAfastamentoContainer.classList.add("hidden");
  });
});

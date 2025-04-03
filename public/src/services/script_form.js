document.addEventListener("DOMContentLoaded", function () {
  // Controle do EPI
  const epiSim = document.getElementById("epiSim");
  const epiNao = document.getElementById("epiNao");
  const epiContainer = document.getElementById("epiContainer");

  // Controle de acidentes anteriores
  const acidentesAnteriores = document.querySelectorAll(
    'input[name="acidentes_anteriores"]'
  );
  const quantidadeAcidentesContainer = document.getElementById(
    "quantidadeAcidentesContainer"
  );

  // Controle de testemunhas
  const testemunhaSim = document.getElementById("testemunhaSim");
  const testemunhaNao = document.getElementById("testemunhaNao");
  const testemunhaContainer = document.getElementById("testemunhaContainer");

  // Controle de afastamento
  const afastamentoSim = document.getElementById("afastamentoSim");
  const afastamentoNao = document.getElementById("afastamentoNao");
  const diasAfastamentoContainer = document.getElementById(
    "diasAfastamentoContainer"
  );

  // Eventos para EPI
  epiSim.addEventListener("change", function () {
    epiContainer.classList.toggle("hidden", !this.checked);
    if (this.checked) {
      document.getElementById("epiUtilizado").required = true;
    }
  });

  epiNao.addEventListener("change", function () {
    epiContainer.classList.toggle("hidden", this.checked);
    if (this.checked) {
      document.getElementById("epiUtilizado").required = false;
    }
  });

  // Eventos para acidentes anteriores
  acidentesAnteriores.forEach((radio) => {
    radio.addEventListener("change", function () {
      quantidadeAcidentesContainer.classList.toggle(
        "hidden",
        this.value !== "sim"
      );
      if (this.value === "sim") {
        document.getElementById("quantidadeAcidentes").required = true;
      } else {
        document.getElementById("quantidadeAcidentes").required = false;
      }
    });
  });

  // Eventos para testemunhas
  testemunhaSim.addEventListener("change", function () {
    testemunhaContainer.classList.toggle("hidden", !this.checked);
    if (this.checked) {
      document.getElementById("testemunhaInfo").required = true;
    }
  });

  testemunhaNao.addEventListener("change", function () {
    testemunhaContainer.classList.toggle("hidden", this.checked);
    if (this.checked) {
      document.getElementById("testemunhaInfo").required = false;
    }
  });

  // Eventos para afastamento
  afastamentoSim.addEventListener("change", function () {
    diasAfastamentoContainer.classList.toggle("hidden", !this.checked);
    if (this.checked) {
      document.getElementById("diasAfastamento").required = true;
    }
  });

  afastamentoNao.addEventListener("change", function () {
    diasAfastamentoContainer.classList.toggle("hidden", this.checked);
    if (this.checked) {
      document.getElementById("diasAfastamento").required = false;
    }
  });

  document
    .getElementById("acidenteForm")
    .addEventListener("submit", function (e) {
      console.log("Formulário enviado");
    });
});

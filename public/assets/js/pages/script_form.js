document.addEventListener("DOMContentLoaded", function () {
  setupConditionalFields();

  const form = document.getElementById("acidenteForm");
  form.addEventListener("submit", handleFormSubmit);
});

function setupConditionalFields() {
  const epiSim = document.getElementById("epiSim");
  const epiNao = document.getElementById("epiNao");
  const epiContainer = document.getElementById("epiContainer");

  epiSim.addEventListener("change", () =>
    epiContainer.classList.toggle("hidden", false)
  );
  epiNao.addEventListener("change", () =>
    epiContainer.classList.toggle("hidden", true)
  );

  document
    .querySelectorAll('input[name="acidentes_anteriores"]')
    .forEach((radio) => {
      radio.addEventListener("change", () => {
        document
          .getElementById("quantidadeAcidentesContainer")
          .classList.toggle("hidden", radio.value !== "sim");
      });
    });

  document
    .querySelectorAll('input[name="confirmacao_testemunha"]')
    .forEach((radio) => {
      radio.addEventListener("change", () => {
        document
          .getElementById("testemunhaContainer")
          .classList.toggle("hidden", radio.value !== "sim");
      });
    });

  document.querySelectorAll('input[name="afastamento"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      document
        .getElementById("diasAfastamentoContainer")
        .classList.toggle("hidden", radio.value !== "sim");
    });
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitButton = form.querySelector('input[type="submit"]');

  try {
    submitButton.disabled = true;
    submitButton.value = "Enviando...";

    if (!validateForm(form)) {
      return;
    }

    const formData = collectFormData(form);

    const response = await fetch("/api/acidentes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Resposta inesperada: ${text.slice(0, 100)}...`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Erro ${response.status}`);
    }

    Swal.fire({
      icon: "success",
      title: "Acidente registrado com sucesso!",
      confirmButtonColor: "#08246d",
      confirmButtonText: "OK",
    });

    form.reset();
  } catch (error) {
    console.error("Erro no envio:", error);
    showNotification(
      "error",
      error.message.includes("Resposta inesperada")
        ? "Erro no servidor. Contate o administrador."
        : error.message
    );
  } finally {
    submitButton.disabled = false;
    submitButton.value = "Registrar";
  }
}

function validateForm(form) {
  let isValid = true;
  const requiredFields = [
    "dataAcidente",
    "local",
    "matricula",
    "agente",
    "descricao",
  ];

  requiredFields.forEach((id) => {
    const field = form.querySelector(`#${id}`);
    if (!field.value.trim()) {
      field.classList.add("error");
      isValid = false;

      if (!field.nextElementSibling?.classList.contains("error-message")) {
        const errorMsg = document.createElement("span");
        errorMsg.className = "error-message";
        errorMsg.textContent = "Campo obrigatório";
        field.parentNode.insertBefore(errorMsg, field.nextSibling);
      }
    } else {
      field.classList.remove("error");
      if (field.nextElementSibling?.classList.contains("error-message")) {
        field.nextElementSibling.remove();
      }
    }
  });

  return isValid;
}

function collectFormData(form) {
  return {
    dataAcidente: form.querySelector("#dataAcidente").value,
    local: form.querySelector("#local").value,
    matricula: form.querySelector("#matricula").value,
    agente: form.querySelector("#agente").value,
    acidentes_anteriores: form.querySelector(
      'input[name="acidentes_anteriores"]:checked'
    ).value,
    quantidadeAcidentes: form.querySelector("#quantidadeAcidentes")?.value,
    confirmacao_testemunha: form.querySelector(
      'input[name="confirmacao_testemunha"]:checked'
    ).value,
    testemunhaInfo: form.querySelector("#testemunhaInfo")?.value,
    afastamento: form.querySelector('input[name="afastamento"]:checked').value,
    diasAfastamento: form.querySelector("#diasAfastamento")?.value,
    turno: form.querySelector('input[name="turno"]:checked')?.value,
    periodo: form.querySelector('input[name="periodo"]:checked').value,
    cat: form.querySelector('input[name="cat"]:checked').value,
    fratura: form.querySelector("#fratura").value,
    descricao: form.querySelector("#descricao").value,
    uso_epi: form.querySelector('input[name="uso_epi"]:checked').value,
    epiUtilizado: form.querySelector("#epiUtilizado")?.value,
  };
}

function showNotification(type, message) {
  const oldNotifications = document.querySelectorAll(".notification");
  oldNotifications.forEach((el) => el.remove());

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 5000);
}

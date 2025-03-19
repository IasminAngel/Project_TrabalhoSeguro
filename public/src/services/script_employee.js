document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    const fields = document.querySelectorAll(".edit-field");
    const texts = document.querySelectorAll(".user-info span");

    // Função para alternar entre visualizar e editar
    editButton.addEventListener("click", function () {
        fields.forEach(field => field.style.display = "block");
        texts.forEach(text => text.style.display = "none");
        editButton.style.display = "none";
        saveButton.style.display = "block";
    });

    // Função para salvar as edições e voltar ao modo de exibição
    saveButton.addEventListener("click", function () {
        fields.forEach((field, index) => {
            texts[index].innerText = field.value;
            field.style.display = "none";
        });

        texts.forEach(text => text.style.display = "block");
        saveButton.style.display = "none";
        editButton.style.display = "block";
    });
});

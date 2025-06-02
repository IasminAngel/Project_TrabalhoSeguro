document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    const fields = document.querySelectorAll(".edit-field");
    const texts = document.querySelectorAll(".user-info span");
    const profileImg = document.getElementById("profile-img");
    const imageInput = document.getElementById("image-input");

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

    
    const profileSection = document.querySelector('.profile-container');
    profileSection.setAttribute('aria-live', 'polite');

    // Função para alterar a imagem de perfil
    profileImg.addEventListener("click", function () {
        imageInput.click(); // Aciona o input de imagem ao clicar na imagem de perfil
    });

    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result; 
            };
            reader.readAsDataURL(file);
        }
    });
});

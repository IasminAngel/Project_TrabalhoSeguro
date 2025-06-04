document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    const fields = document.querySelectorAll(".edit-field");
    const texts = document.querySelectorAll(".user-info span");
    const profileImg = document.getElementById("profile-img");
    const imageInput = document.getElementById("image-input");

    // Alternar entre visualização e edição
    editButton.addEventListener("click", function () {
        fields.forEach(field => field.style.display = "block");
        texts.forEach(text => text.style.display = "none");
        editButton.style.display = "none";
        saveButton.style.display = "block";
    });

    // Salvar as edições e voltar à visualização
    saveButton.addEventListener("click", function () {
        fields.forEach((field, index) => {
            const value = field.value;
            texts[index].innerText = value;
            localStorage.setItem(`campo${index}`, value); // Salva no localStorage
            field.style.display = "none";
        });

        texts.forEach(text => text.style.display = "block");
        saveButton.style.display = "none";
        editButton.style.display = "block";
    });

    // Acessibilidade (leitor de tela)
    const profileSection = document.querySelector('.profile-container');
    profileSection.setAttribute('aria-live', 'polite');

    // Troca da imagem de perfil
    profileImg.addEventListener("click", function () {
        imageInput.click(); // Abre o seletor de arquivo
    });

    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
                localStorage.setItem("profileImage", e.target.result); // Salva a imagem no localStorage
            };
            reader.readAsDataURL(file);
        }
    });

    // Carregar dados salvos
    function carregarDados() {
        // Carregar textos
        texts.forEach((text, index) => {
            const valorSalvo = localStorage.getItem(`campo${index}`);
            if (valorSalvo) {
                text.innerText = valorSalvo;
                fields[index].value = valorSalvo;
            }
        });

        // Carregar imagem
        const imagemSalva = localStorage.getItem("profileImage");
        if (imagemSalva) {
            profileImg.src = imagemSalva;
        }
    }

    carregarDados();
});

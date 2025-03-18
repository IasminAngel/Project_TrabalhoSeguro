document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add-item");
    const saveButton = document.querySelector("#save-item");
    const form = document.querySelector("#item-form");
    const tableBody = document.querySelector("tbody");

    // Mostrar o formulário ao clicar no botão "Adicionar item"
    addButton.addEventListener("click", function () {
        form.style.display = "block";
    });

    // Função para formatar a data
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Salvar o novo item na tabela
    saveButton.addEventListener("click", function () {
        const name = document.querySelector("#item-name").value;
        const id = document.querySelector("#item-id").value;
        const date = document.querySelector("#item-date").value;

        // Verificando se todos os campos foram preenchidos
        if (name === "" || id === "" || date === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Formatando a data
        const formattedDate = formatDate(date);

        // Criando uma nova linha
        const newRow = document.createElement("tr");

        // Criando as células e adicionando os valores
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${id}</td>
            <td>${formattedDate}</td>
        `;

        // Adicionando a nova linha à tabela
        tableBody.appendChild(newRow);

        // Escondendo o formulário novamente
        form.style.display = "none";
        document.querySelector("#item-name").value = "";
        document.querySelector("#item-id").value = "";
        document.querySelector("#item-date").value = "";
    });
});

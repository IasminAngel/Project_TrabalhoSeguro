document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add-item");
    const saveButton = document.querySelector("#save-item");
    const form = document.querySelector("#item-form");
    const tableBody = document.querySelector("tbody");

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function applyRowColor(row, dateString) {
        const dataAtual = new Date();
        const dataEPI = new Date(dateString);
        const diffTempo = dataAtual - dataEPI;
        const diffDias = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

        if (diffDias > 365) {
            row.style.backgroundColor = "#FF6347";
        } else if (diffDias > 180) {
            row.style.backgroundColor = "#fff8b3";
        } else {
            row.style.backgroundColor = "#ccffcc";
        }
    }

    // Cria a linha da tabela, incluindo botão de excluir
    function createTableRow(item, index) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td>${formatDate(item.date)}</td>
            <td><button class="delete-btn" data-index="${index}">Excluir</button></td>
        `;
        applyRowColor(newRow, item.date);
        return newRow;
    }

    function loadItems() {
        const items = JSON.parse(localStorage.getItem("epis")) || [];
        tableBody.innerHTML = ""; // limpa antes
        items.forEach((item, index) => {
            const row = createTableRow(item, index);
            tableBody.appendChild(row);
        });
        attachDeleteListeners();
    }

    // Função para remover item do localStorage e da tabela
    function deleteItem(index) {
        let items = JSON.parse(localStorage.getItem("epis")) || [];
        items.splice(index, 1); // Remove o item do array
        localStorage.setItem("epis", JSON.stringify(items));
        loadItems(); // Recarrega a tabela atualizada
    }

    // Adiciona os listeners aos botões de excluir
    function attachDeleteListeners() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.getAttribute("data-index");
                deleteItem(index);
            });
        });
    }

    addButton.addEventListener("click", () => {
        form.style.display = "block";
    });

    saveButton.addEventListener("click", () => {
        const name = document.querySelector("#item-name").value.trim();
        const id = document.querySelector("#item-id").value.trim();
        const date = document.querySelector("#item-date").value;

        if (!name || !id || !date) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const newItem = { name, id, date };

        const items = JSON.parse(localStorage.getItem("epis")) || [];
        items.push(newItem);
        localStorage.setItem("epis", JSON.stringify(items));

        loadItems();

        form.style.display = "none";
        document.querySelector("#item-name").value = "";
        document.querySelector("#item-id").value = "";
        document.querySelector("#item-date").value = "";
    });

    loadItems();
});

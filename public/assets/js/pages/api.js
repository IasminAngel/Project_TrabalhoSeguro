document.addEventListener("DOMContentLoaded", () => {
    const btnAdd = document.getElementById("btn_add_member");

    btnAdd.addEventListener("click", async () => {
        const nome = document.getElementById("setor_name").value.trim();
        const descricao = document.querySelectorAll(".data_bar")[1].value.trim();
        const tecnico = document.getElementById("setor_technic").value.trim();
        const dataCriacao = document.querySelectorAll(".data_bar")[3].value.trim();

        if (!nome || !descricao || !tecnico || !dataCriacao) {
            alert("Preencha todos os campos.");
            return;
        }

        const setorData = {
            nome,
            descricao,
            tecnico_responsavel: tecnico,
            data_criacao: dataCriacao
        };

        try {
            const response = await fetch("http://localhost:3000/setor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(setorData)
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar setor");
            }

            const result = await response.json();
            alert("Setor adicionado com sucesso!");
            // Redirecionar ou limpar campos se necessário
        } catch (error) {
            console.error(error);
            alert("Falha ao adicionar setor. Tente novamente.");
        }
    });
});

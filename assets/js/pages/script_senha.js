document.getElementById("confirm").addEventListener("click", async function (event) {
    event.preventDefault();

    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");
    const errorDiv = document.getElementById("error-message");
    errorDiv.style.display = "none";

    // Validações básicas
    let errorMessage = "";
    if (!emailField.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        errorMessage += "Insira um email válido.<br>";
        emailField.style.border = "1px solid red";
    }
    if (!passwordField.value || passwordField.value.length > 8) {
        errorMessage += "A senha deve ter até 8 caracteres.<br>";
        passwordField.style.border = "1px solid red";
    }
    if (passwordField.value !== confirmPasswordField.value) {
        errorMessage += "As senhas não correspondem!<br>";
        confirmPasswordField.style.border = "1px solid red";
    }

    if (errorMessage) {
        errorDiv.innerHTML = errorMessage;
        errorDiv.style.display = "block";
        return;
    }

    try {
        let token = localStorage.getItem("token");
        let response = await makePasswordChangeRequest(token, emailField.value, passwordField.value);

        // Se token expirado, tenta renovar
        if (response.status === 401) {
            const refreshResponse = await fetch("http://localhost:3000/api/refresh-token", {
                method: "POST",
                credentials: "include" // Importante para enviar cookies
            });

            if (refreshResponse.ok) {
                const { token: newToken } = await refreshResponse.json();
                localStorage.setItem("token", newToken);
                response = await makePasswordChangeRequest(newToken, emailField.value, passwordField.value);
            } else {
                throw new Error("Sessão expirada. Faça login novamente.");
            }
        }

        // Processa resposta final
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "Erro desconhecido" }));
            throw new Error(error.message);
        }

        alert("Senha alterada com sucesso!");
        window.location.href = "/login";

    } catch (error) {
        console.error("Erro:", error);
        errorDiv.innerHTML = error.message.includes("expired") || error.message.includes("inválido") 
            ? "Sessão expirada. Faça login novamente."
            : error.message;
        errorDiv.style.display = "block";
    }
});

// Função auxiliar para fazer a requisição de alteração de senha
async function makePasswordChangeRequest(token, email, newPassword) {
    return await fetch("http://localhost:3000/api/alterar-senha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            email: email,
            novaSenha: newPassword
        })
    });
}
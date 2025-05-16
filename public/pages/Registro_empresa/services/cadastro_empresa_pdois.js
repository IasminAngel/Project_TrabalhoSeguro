const emails = document.getElementById("emails");
const btn_save_email = document.getElementById("btn_save_email");
const select = document.getElementById("colaboradores");
const btn_trash = document.getElementById("btn_trash");
const btn_hint = document.getElementById("btn_hint");
const hint = document.getElementById("hint");
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITE_EMAILS = 10;

function atualizarEstado() {
    const totalOpcoes = select.options.length;

    btn_trash.style.display = totalOpcoes > 0 ? "inline" : "none";

    btn_save_email.disabled = totalOpcoes >= LIMITE_EMAILS;
}


btn_save_email.addEventListener("click", function () {
    if (emails.value.trim() !== "") {

        if (!regex.test(emails.value)) {
            alert("Email inváido, por favor, insira um outro válido");
            return;
        }

        
        // for (let i = 0; i < select.options.length; i++) {
        //     if (select.options[i].value === emails.value) {
        //         alert("Este email já foi adicionado.");
        //         return;
        //     }
        // }

        
        if (select.options.length >= LIMITE_EMAILS) {
            alert(`Você só pode adicionar até ${LIMITE_EMAILS} emails.`);
            return;
        }
        
        
    const new_option = document.createElement("option");
    new_option.value = emails.value;
    new_option.text = emails.value;
    select.appendChild(new_option);
    
    emails.value = "";
    emails.focus();

    }

    
    atualizarEstado();
    
});




btn_trash.addEventListener("click", function () {
    select.remove(select.selectedIndex);
    atualizarEstado();

});

atualizarEstado();

btn_hint.addEventListener("click", function() {
    hint.style.display = hint.style.display === "none" ? "flex" : "none";
})

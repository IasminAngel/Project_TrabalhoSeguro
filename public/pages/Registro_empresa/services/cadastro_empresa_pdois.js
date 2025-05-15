emails = document.getElementById("emails");
btn_save_email = document.getElementById("btn_save_email");
select = document.getElementById("colaboradores");
btn_trash = document.getElementById("btn_trash");

btn_save_email.addEventListener("click", function() {
    new_option = document.createElement("option");
    new_option.value = emails.value;
    new_option.text = emails.value;
    colaboradores.appendChild(new_option);
    emails.value = "";
    emails.focus();
});

if (select.options.length > 0) {
    btn_trash.style.display = "block";
    
}

btn_trash.addEventListener("click", function() {
    select.remove(select.selectedIndex);
})
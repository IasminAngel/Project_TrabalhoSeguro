// Salvando o conteudo e exibindo no index



import {expFuncionarios as func} from "./api.js";


//criando os botões de enviar e cancelar

export let contador = 0;

export const btn_enviar = document.createElement("button");
const btn_enviar_content = document.createTextNode("Enviar");
btn_enviar.appendChild(btn_enviar_content);

btn_enviar.style.display = "none"
btn_enviar.style.width = "70px";
btn_enviar.style.height = "30px";
btn_enviar.style.border = "1px solid white";
btn_enviar.style.borderRadius = "12px";
btn_enviar.style.backgroundColor = "#6175A8";
btn_enviar.style.color = "white";

export const btn_cancelar = document.createElement("button");
const btn_cancelar_content = document.createTextNode("Cancelar");
btn_cancelar.appendChild(btn_cancelar_content);

btn_enviar.style.display = "none"
btn_cancelar.style.width = "70px";
btn_cancelar.style.height = "30px";
btn_cancelar.style.border = "1px solid white";
btn_cancelar.style.borderRadius = "12px";
btn_cancelar.style.backgroundColor = "#6175A8";
btn_cancelar.style.color = "white";

const div_btns_final = document.createElement("div");
div_btns_final.appendChild(btn_enviar);
div_btns_final.appendChild(btn_cancelar);

div_btns_final.style.display = "flex";
div_btns_final.style.gap = "50px";
div_btns_final.style.width = "100%";
div_btns_final.style.marginTop = "10px";
div_btns_final.style.justifyContent = "center";

export let opt_nome = [];
export let opt_id = [];


const add = document.getElementById("btn_add_member");
add.addEventListener("click", function() {
      
      contador++;

     //declarando variáveis
     const container = document.createElement("div");
     const label_title = document.createElement("span");
     const label_title_content = document.createTextNode(`Membro ${contador}`);
     const label_name = document.createElement("span");
     const label_name_content = document.createTextNode("Nome completo do membro: ");
     const label_funcao = document.createElement("span")
     const label_funcao_content = document.createTextNode("Função: ");
     const btn_trash = document.createElement("button");
     const icon_trash = document.createElement("icon");
     const label_id = document.createElement("span")
     const label_id_content = document.createTextNode("Id: ");
     const selector_name = document.createElement("select");
     const input_function = document.createElement("input");
     const select_id = document.createElement("select");
     const div_first_line = document.createElement("div");
     const div_second_line = document.createElement("div");
     const div_last_line = document.createElement("div");
     const div_father = document.createElement("div");
     
     

     //estilizando o container
 
     container.style.backgroundColor = "#0A2D89";
     container.style.width = "410px";
     container.style.color = "white";
     container.style.padding = "8px";
     container.style.borderRadius = "12px";
     container.style.margin = "10px";
   
 
     // criando os "Filhos"
     
     label_title.appendChild(label_title_content);
 
      label_name.appendChild(label_name_content);
 
     icon_trash.classList.add("fas", "fa-trash-alt");
     btn_trash.appendChild(icon_trash);
 
     label_funcao.appendChild(label_funcao_content);
 
      label_id.appendChild(label_id_content);
 


     for (let j = 0; j < func().length; j++) {

          opt_nome[j] = document.createElement("option");
          opt_nome[j].textContent = func()[j].nome;
          opt_nome[j].value = j;
          opt_nome[j].disabled = false;
          opt_nome[j].selected = true;
          selector_name.appendChild(opt_nome[j]);
     }
     
     selector_name.addEventListener("change", function () {
          let selected_value = this.value;
          select_id.value = selected_value;
     })

     
     for (let k = 0; k < func().length; k++) {

          opt_id[k] = document.createElement("option");
          opt_id[k].textContent = func()[k].id;
          opt_id[k].value = k;
          opt_id[k].disabled = false;
          opt_id[k].selected = true;
          select_id.appendChild(opt_id[k]);
     }

     select_id.addEventListener("change", function () {
          let selected_value = this.value;
          selector_name.value = selected_value;
     })

     div_first_line.appendChild(label_title);
     div_first_line.appendChild(btn_trash);
     div_first_line.style.display = "flex";
     div_first_line.style.justifyContent = "space-between";
     
     div_second_line.appendChild(label_name);
     div_second_line.appendChild(selector_name);
     div_second_line.style.display = "flex";
     
 
     div_last_line.appendChild(label_id);
     div_last_line.appendChild(select_id);
     div_last_line.style.display = "flex";
 
    // agrupando os filhos ao pai

    
     container.appendChild(div_first_line);
     container.appendChild(div_second_line);
     container.appendChild(label_funcao);
     container.appendChild(input_function);
     container.appendChild(div_last_line);
     
     
     btn_enviar.style.display = "inline";
     btn_cancelar.style.display = "inline";

     div_father.appendChild(container);
     div_father.appendChild(div_btns_final);

     document.getElementById("marker").appendChild(div_father);
     
});
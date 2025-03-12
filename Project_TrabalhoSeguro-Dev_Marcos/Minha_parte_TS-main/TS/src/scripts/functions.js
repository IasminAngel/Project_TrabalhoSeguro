//funções dos botões

import { btn_enviar } from "./index.js";
import { btn_cancelar } from "./index.js";
import {contador} from "./index.js";
import { opt_id } from "./index.js";
import { opt_nome } from "./index.js";

const objects_table = [];
let table = document.getElementById("table_main_content");

btn_enviar.addEventListener("click", function(){
    
    for (let i = 0; i < contador; i++){

         objects_table[i] = {

            id : opt_id[i].textContent, 
            nome : opt_nome[i].textContent, 
            setor : document.getElementById("setor_name").value

        }
    }
    
    const tr = document.createElement("tr");
    const td_id = document.createElement("td");
    const td_nome = document.createElement("td");
    const td_setor = document.createElement("td");
    const td_acessar_perfil = document.createElement("td");
    const btn_acessar_perfil = document.createElement("button");

    for (let index = 0; index < objects_table.length; index++) {
        
        
        td_id.textContent = objects_table[index].id;
        td_nome.textContent = objects_table[index].nome;
        td_setor.textContent = objects_table[index].setor;
        td_acessar_perfil.appendChild(btn_acessar_perfil);
        
        tr.appendChild(td_id);
        tr.appendChild(td_nome);
        tr.appendChild(td_setor);
        tr.appendChild(td_acessar_perfil);
        
        console.log(tr);
        
        
    }
    
    table.appendChild(tr);        
    console.log(table);

});

btn_cancelar.addEventListener("click", function() {
    document.getElementById("marker").innerHTML = "";
    btn_enviar.style.display = "none";
    btn_cancelar.style.display = "none";
    
});
import { simulacao } from "./api.js";
const dados = simulacao;

let flag = maxLinhas();
let novoLimite = flag * 2;
let j = 0;

const btn_proxima_pagina = document.getElementById("btn_next_page");
const btn_pagina_anterior = document.getElementById("btn_back_page");
let valorAtualFlag;
let valorAtualNovoLimite;

// Função para calcular o número máximo de linhas a serem exibidas na tabela, dependendo da altura da janela do navegador

export function maxLinhas() {
    let Limitelinhas;

    if (window.innerHeight <= 450) {
        Limitelinhas = 8;
    } else if (window.innerHeight <= 700) {
        Limitelinhas = 12;
    } else if (window.innerHeight <= 1250) {
        Limitelinhas = 15;
    } else {
        Limitelinhas = 25;
    }
    return Limitelinhas;
}

export function CorValidade() {
    const hoje = new Date();
    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;
    const ano = hoje.getFullYear();
    const diaValidade = [];
    const mesValidade = [];
    const anoValidade = [];
 
    for (let index = 0; index < dados.length; index++) {
        
        const data = new Date(dados[index].validade);
        
          diaValidade.push(data.getDate());
          mesValidade.push(data.getMonth() + 1);
          anoValidade.push(data.getFullYear());
     
    }
    
 
     const cor = [];
 
     
     for (let i = 0; i < dados.length; i++) {
         
         
         if (anoValidade[i] - ano === 1 && mesValidade[i] - mes <= 0 && diaValidade <= dia) {
     
            return cor[i] = "rgb(184, 184, 0)";
     
     
         } else if (anoValidade - ano <= 0 && mesValidade - mes <= 6 && diaValidade <= dia) {
     
             return cor[i] = "red";
     
         } else {
            return cor[i] = "green";
         }
     }
 
 }


// Função para carregar os dados na tabela advindos do BD
export function preencherTabela(limite) {

    const tabela = document.createElement("table");
    const container = document.getElementById("main_container");
    const thead = document.createElement('thead');
    thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>ENTREGA</th>
                <th>VALIDADE</th>
                <th>COLABORADOR</th>
            </tr>
        `;
    tabela.appendChild(thead);
    const tbody = document.createElement("tbody");

    dados.forEach(item => {

        if (tbody.children.length >= limite) {
            return;

        }
        const tr = document.createElement('tr');

        tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.entrega}</td>
                    <td>
                        <div style="background-color: ${CorValidade()}">
                            ${item.validade}
                        </div>
                    </td>
                `;

        const tdBotao = document.createElement('td');
        const botao = document.createElement('button');

        botao.innerHTML = `<i class="fa-solid fa-user"></i> ${item.id}`;

        tdBotao.appendChild(botao);
        tr.appendChild(tdBotao);
        tbody.appendChild(tr);
    });

    tabela.appendChild(tbody);
    container.appendChild(tabela);
    container.appendChild(tabela);


    if (tbody.children.length === maxLinhas() && (dados.length > maxLinhas())) {
        footer.style.display = "flex";
    }   
}

export function paraProximaPagina() {
     btn_proxima_pagina.addEventListener("click", () => {
    
            const tabela = document.querySelector("table");
            const tbody = document.createElement("tbody");
    
            if(flag === 0 && novoLimite === 12){
                flag = maxLinhas();
                novoLimite = flag * 2;
                console.log("Limites ajustados:", flag, novoLimite);
            }
            valorAtualFlag = flag;
            valorAtualNovoLimite = novoLimite;
    
            tabela.innerHTML = "";
    
            const container = document.getElementById("main_container");
            const thead = document.createElement('thead');
            thead.innerHTML = `
                    <tr>
                        <th>ID</th>
                        <th>ENTREGA</th>
                        <th>VALIDADE</th>
                        <th>COLABORADOR</th>
                    </tr>
                `;
            tabela.appendChild(thead);
    
    
            for (let i = flag; i < novoLimite; i++) {
               const  item = dados[i];
               
               j++;
    
               
                if ((tbody.children.length >= maxLinhas()) || !item) {
                    btn_proxima_pagina.style.display = "none";
                    break;
                }
                    
                const tr = document.createElement('tr');
    
                tr.innerHTML = `
                            <td>${item.id}</td>
                            <td>${item.entrega}</td>
                            <td>
                             <div style="background-color: ${CorValidade()}">
                             ${item.validade}
                            </div>
                            </td>
                        `;
    
                const tdBotao = document.createElement('td');
                const botao = document.createElement('button');
    
                botao.innerHTML = `<i class="fa-solid fa-user"></i> ${item.id}`;
                tdBotao.appendChild(botao);
                tr.appendChild(tdBotao);
                tbody.appendChild(tr);
                tabela.appendChild(tbody);
                container.appendChild(tabela);
            
            }
    
            
            flag += maxLinhas();
            novoLimite += maxLinhas();
            console.log(flag, novoLimite);
    
            if (flag > maxLinhas()) 
                btn_pagina_anterior.style.display = "flex";
            
    
            const paginaAtual = document.getElementById("current_page");
            const proximaPagina = document.getElementById("next_page");
    
            const paginaAtualContent = document.getElementById("current_page").textContent;
            const proximaPaginaContent = document.getElementById("next_page").textContent;
    
            let paginaAtualValor = parseInt(paginaAtualContent);
            let proximaPaginaValor = parseInt(proximaPaginaContent);
        
            proximaPaginaValor += 1;
            paginaAtualValor += 1;
    
            let proximaPaginaValort = String(proximaPaginaValor);
            let paginaAtualValort = String(paginaAtualValor);
    
            paginaAtual.innerText =  paginaAtualValort;
            proximaPagina.innerText = proximaPaginaValort;
        });
}

export function paraProximaAnterior() {
    btn_pagina_anterior.addEventListener("click", () => {

        const tabela = document.querySelector("table");
        const tbody = document.createElement("tbody");
    
        
        novoLimite = flag;
        flag = novoLimite - maxLinhas();
    
        console.log(flag, novoLimite);
    
        if (novoLimite === valorAtualNovoLimite && flag === valorAtualFlag) {
            novoLimite -= maxLinhas();
            flag -= maxLinhas();
            console.log("Bananas, maçãs e pêras");
            console.log(novoLimite, flag);
            console.log(valorAtualNovoLimite, valorAtualFlag);
        }
    
    
        if(flag === 0)
            btn_pagina_anterior.style.display = "none";
    
        tabela.innerHTML = "";
    
        const container = document.getElementById("main_container");
        const thead = document.createElement('thead');
        thead.innerHTML = `
                <tr>
                    <th>ID</th>
                    <th>ENTREGA</th>
                    <th>VALIDADE</th>
                    <th>COLABORADOR</th>
                </tr>
            `;
        tabela.appendChild(thead);
    
    
    
        for (let i = flag; i < novoLimite; i++) {
            const item = dados[i];
    
    
            if(item){  
    
                const tr = document.createElement('tr');
        
                tr.innerHTML = `
                            <td>${item.id}</td>
                            <td>${item.entrega}</td>
                            <td>
                                <div style="background-color: ${CorValidade()}">
                                    ${item.validade}
                                </div>
                            </td>
                        `;
        
                const tdBotao = document.createElement('td');
                const botao = document.createElement('button');
        
                botao.innerHTML = `<i class="fa-solid fa-user"></i> ${item.id}`;
                tdBotao.appendChild(botao);
                tr.appendChild(tdBotao);
                tbody.appendChild(tr);
                tabela.appendChild(tbody);
                container.appendChild(tabela);
            }
    
            }
    
            if(flag > 0)
                btn_proxima_pagina.style.display = "flex";
    
        
        const paginaAtual = document.getElementById("current_page");
        const proximaPagina = document.getElementById("next_page");
    
        const paginaAtualContent = document.getElementById("current_page").textContent;
        const proximaPaginaContent = document.getElementById("next_page").textContent;
    
        let paginaAtualValor = parseInt(paginaAtualContent);
        let proximaPaginaValor = parseInt(proximaPaginaContent);
        
        proximaPaginaValor -= 1;
        paginaAtualValor -= 1;
    
        let proximaPaginaValort = String(proximaPaginaValor);
        let paginaAtualValort = String(paginaAtualValor);
    
        paginaAtual.innerText =  paginaAtualValort;
        proximaPagina.innerText = proximaPaginaValort;
            
    });
}

function queryEpi() {
    const input = document.getElementById("query_bar").textContent;

    
}
//Adicionar a cor de fundo da validade
//Adicionar novos registros na tabela
//Fazer funcionar a query de busca

import { simulacao } from "./api.js";
import {preencherTabela, maxLinhas, CorValidade, paraProximaPagina, paraProximaAnterior} from "./functions.js";


const dados = simulacao;
CorValidade();

//document.getElementById("validate_color").style.backgroundColor = CorValidade();


//------------------------------------------------------------------------------------------





window.onload = function () {

    const footer = document.getElementById("footer");

    preencherTabela(maxLinhas());

    paraProximaPagina();
    paraProximaAnterior();
    

}
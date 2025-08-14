import { PALAVRAS_RUINS } from "./palavrasRuins.js";
const botaoMostraPalavras = Document.querySelector('#botao-palavraschave');

botaoMostraPalavras.addEventListner('click', mostraPalavraChave);

function mostraPalavraChave(){
    const texto = document.querySelector('#entrada-de-texto').value;
    const campoReultado =document.querySelector('#resultado-palavrachave');
    const palavrasChave = processaTexto(texto);
 

    campoReultado.textContent= palavrasChave.join(", ");
}

function processaTexto(texto){
    let palavras = texto.split(/\P{L}+/u);

    for(let i in palavras){
        palavras[i]=palavras[i].toLowerCase();
    }

    palavras = tiraPalavrasRuins(palavras);

    const frequencias= contaFrequencia(palavras);
    let ordenadas = Object.keys(frequencias).sort(ordenaPalavra);

    function ordenaPalavra(p1,p2){
        return frequencias[p2] - frequencias[p1];
    }

    console.log(ordenadas);
    return ordenadas.slice(0,10);
}
function contaFrequencia(palavras){
     let frequencias = {};
    for(let i in palavras){
        frequencias[i]=0;
        for(let j in palavras){
            if(i == j){
                frequencias[i]++;
            }
        }
    }
   return frequencias;
}
function tiraPalavrasRuins(palavras) {
    const palavrasBoas=[];
    for(let palavra of palavras){
        if(!PALAVRAS_RUINS.has(palavras)&&palavra.length > 2){
        palavrasBoas.push(palavra);
        }
    }
    return palavrasBoas;
}
//Define o tamanho dos blocos
const tamanhoBloco = 40;

//Pega a altura e largura da página
const altura = document.documentElement.scrollHeight;
const largura = document.documentElement.scrollWidth;

const grid = document.querySelector("#grid");
const blocos = document.querySelector("#blocos");

//Div com as cores
const paleta_cores = document.querySelector("#paleta_cores");

//Cores
const vermelho = document.querySelector("#vermelho");
const verde = document.querySelector("#verde");
const azul = document.querySelector("#azul");
const amarelo = document.querySelector("#amarelo");
const roxo = document.querySelector("#roxo");
const aqua = document.querySelector("#aqua");
const fuchsia = document.querySelector("#fuchsia");
const laranja = document.querySelector("#laranja");
const marrom = document.querySelector("#marrom");
const preto = document.querySelector("#preto");
const branco = document.querySelector("#branco");
const cinza = document.querySelector("#cinza");
const lima = document.querySelector("#lima");
const navy = document.querySelector("#navy");
const teal = document.querySelector("#teal");
const oliva = document.querySelector("#oliva");


const hidden = document.querySelector(".hidden");

//Pega os ids da coluna e linha criadas na div 
const grid_coluna = document.querySelector("#grid_coluna_id");
const grid_linha = document.querySelector("#grid_linha_id");

//Atribui a altura e largura total da página na linha e coluna perpectivamente 
grid_coluna.style.height = `${altura}px`;
grid_linha.style.width = `${largura}px`;

//Esconde linha e coluna
grid_coluna.classList.add("hidden");
grid_linha.classList.add("hidden");

const bloco_cor = document.querySelector("#bloco_cor");

bloco_cor.style.display = "none";

//Cria o contador para dar os nomes as ids
let contador = 0;

//Duplica e aplica os parametros nas colunas com gap de 15px
for (let i = 0; i < largura; i += tamanhoBloco){

    const coluna = grid_coluna.cloneNode(true);

    coluna.id = `coluna_${contador}`;
    
    coluna.style.display = "flex";
    coluna.style.position = "absolute";
    coluna.style.width = "1px";
    coluna.style.height = `${altura}px`;
    coluna.style.left = `${i}px`;
    coluna.style.top = "0px";
    coluna.style.backgroundColor = "black";
    coluna.classList.remove("hidden");

    grid.appendChild(coluna);

    contador += 1;
}

contador = 0;

//Duplica e aplica os parametros nas linhas com gap de 15px
for (let i = 0; i < altura; i += tamanhoBloco){

    const linha = grid_linha.cloneNode(true);

    linha.id = `linha_${contador}`;
    
    linha.style.display = "flex";
    linha.style.position = "absolute";
    linha.style.height = "1px";
    linha.style.width = `${largura}px`;
    linha.style.top = `${i}px`;
    linha.style.left = "0px";
    linha.style.backgroundColor = "black";
    linha.classList.remove("hidden");

    grid.appendChild(linha);

    contador += 1;
}

let bloco_x = [];
let bloco_y = [];

//Cria uma lista com a área dos blocos x separado por outra lista
for (let i = 0; i < largura; i += tamanhoBloco) {
    bloco_x.push([i, i + tamanhoBloco]);
}

//Cria uma lista com a área dos blocos y separado por outra lista
for (let i = 0; i < altura; i += tamanhoBloco) {
    bloco_y.push([i, i + tamanhoBloco]);
}

// console.log(bloco_x);
// console.log(bloco_y);

let apagar = false;

//Se apertar '5' esconde ou mostra a grid
document.addEventListener("keydown", (event) => {
    if (event.key === "5" && !event.repeat){
        grid.classList.toggle("hidden");
    }

    if (event.key === "1" && !event.repeat){
        apagar = !apagar;
    }

    if (event.key === "2"){
        paleta_cores.classList.toggle("hidden");
    }
});

let ocupado = [];
let x;
let y;

let corSelecionada = "blue";

document.addEventListener("mousedown", (event) =>{
    // console.log(event.clientX, event.clientY);
    
    
    // Se clicou na paleta, não faz nada na grid
    if (paleta_cores.contains(event.target)){
        if (vermelho.contains(event.target)) {
            corSelecionada = "red";
        }

        if (verde.contains(event.target)) {
            corSelecionada = "green";
        }

        if (azul.contains(event.target)) {
            corSelecionada = "blue";
        }

        if (amarelo.contains(event.target)) {
            corSelecionada = "yellow";
        }

        if (roxo.contains(event.target)) {
            corSelecionada = "purple";
        }

        if (aqua.contains(event.target)) {
            corSelecionada = "aqua";
        }

        if (fuchsia.contains(event.target)) {
            corSelecionada = "fuchsia";
        }

        if (laranja.contains(event.target)) {
            corSelecionada = "orange";
        }

        if (marrom.contains(event.target)) {
            corSelecionada = "brown";
        }

        if (preto.contains(event.target)) {
            corSelecionada = "black";
        }

        if (branco.contains(event.target)) {
            corSelecionada = "white";
        }

        if (cinza.contains(event.target)) {
            corSelecionada = "gray";
        }

        if (lima.contains(event.target)) {
            corSelecionada = "lime";
        }

        if (navy.contains(event.target)) {
            corSelecionada = "navy";
        }

        if (teal.contains(event.target)) {
            corSelecionada = "teal";
        }

        if (oliva.contains(event.target)) {
            corSelecionada = "olive";
        }

        return;
    }
    
    //Encontra X
    for (let i = 0; i < bloco_x.length; i += 1) {
        if (event.clientX >= bloco_x[i][0] && event.clientX < bloco_x[i][1]) {
            // console.log("Está dentro do bloco x:", bloco_x[i]);
            
            x = bloco_x[i][0];
            break
        }
    }
    
    //Encontra Y
    for (let i = 0; i < bloco_y.length; i += 1){
        if (event.clientY >= bloco_y[i][0] && event.clientY < bloco_y[i][1]) {
            // console.log("Está dentro do bloco y:", bloco_y[i]);
            
            y = bloco_y[i][0];
            break
        }
    }
    
    //Clona o bloco
    const bloco_cor_clone = bloco_cor.cloneNode(true);
    bloco_cor_clone.style.display = "flex";
    bloco_cor_clone.style.left = `${x}px`;
    bloco_cor_clone.style.top = `${y}px`;
    bloco_cor_clone.style.backgroundColor = corSelecionada;
    
    let jaOcupado = false;

    if (apagar === false){
        //Verifica se não há bloco na posição clicada
        for (let i = 0; i < ocupado.length; i += 1){
            if (ocupado[i][0] === x && ocupado[i][1] === y){
                jaOcupado = true;
                break
            }
        }
        //Se não tiver nenhum bloco adiciona
        if (jaOcupado === false) {
            blocos.appendChild(bloco_cor_clone);
            ocupado.push([x, y, bloco_cor_clone]);
        }
        // console.log(ocupado);
    }

    //Apaga o bloco clicado
    if (apagar === true){
        for (let i = 0; i < ocupado.length; i += 1){
            if ((ocupado[i][0] === x) && ocupado[i][1] === y){
                ocupado[i][2].remove();
                ocupado.splice(i, 1);
                break;
            }
        }
    }

});

// console.log(altura, largura);

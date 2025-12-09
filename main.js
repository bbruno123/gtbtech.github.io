const botaoMenu = document.querySelector("#botao_menu");
const menuEsquerdo = document.querySelector("#menu_esquerdo");
const menuEsquerdoBotao = document.querySelector("#menu_esquerdo_botao");

function ativarMenu() {
    if (!botaoMenu.classList.contains("hidden")) {

        botaoMenu.classList.add("hidden");
        menuEsquerdo.classList.remove("hidden");
        menuEsquerdo.classList.add("show");
    }
}


function fecharMenu() {
    if (!menuEsquerdo.classList.contains("hidden")) {
        
        menuEsquerdo.classList.remove("show");
        menuEsquerdo.classList.add("hidden");
        botaoMenu.classList.remove("hidden");

    }
}

botaoMenu.addEventListener('click', ativarMenu);
menuEsquerdoBotao.addEventListener('click', fecharMenu);
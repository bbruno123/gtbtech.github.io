const botaoMenu = document.querySelector("#botao_menu");
const menuEsquerdo = document.querySelector("#menu_esquerdo");
const menuEsquerdoBotao = document.querySelector("#menu_esquerdo_botao");
const menuEsquerdoBody = document.querySelector(".menu_esquerdo");
const body = document.querySelector("body");

let menuAtivo = false;

function ativarMenu() {
    if (!botaoMenu.classList.contains("hidden")) {

        botaoMenu.classList.add("hidden");
        menuEsquerdo.classList.remove("hidden");
        menuEsquerdo.classList.add("show");
        body.classList.add("no_scroll");
        body.classList.add("blurry_background");

        menuAtivo = true;

    }
}

function fecharMenu() {
    if (!menuEsquerdo.classList.contains("hidden")) {
        
        menuEsquerdo.classList.remove("show");
        menuEsquerdo.classList.add("hidden");
        botaoMenu.classList.remove("hidden");
        body.classList.remove("no_scroll");
        body.classList.remove("blurry_background");
        
        menuAtivo = false;

    }
}

menuEsquerdoBody.addEventListener('click', ativarMenu);
menuEsquerdoBotao.addEventListener('click', fecharMenu);

let space = false;
const myProjectsReturn = document.querySelector("#my_projects_return");

window.addEventListener("keydown", event => {

    if (event.shiftKey && event.key === " " && !event.repeat) {
        space = !space;

        if (space === true) {
            myProjectsReturn.classList.remove("hidden");

            if (menuAtivo === true) {
                // Mantém o fundo desfocado quando o menu está ativo
            }else {
                body.classList.add("blurry_background");
            }

        }else {
            myProjectsReturn.classList.add("hidden");
            
            if (menuAtivo === true) {
                // Mantém o fundo desfocado quando o menu está ativo
            }else {
                body.classList.remove("blurry_background");
            }
        }
    }

});
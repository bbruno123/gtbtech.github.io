const dvd = document.getElementById("dvd");

let top = 0;
let left = 0;

let dirX = 1.3;
let dirY = 1;

setInterval(() => {
    top += dirY;
    left += dirX;

    if (top >= 96 || top <= 0) {
        dirY *= -1;
    }

    if (left >= 95 || left <= 0) {
        dirX *= -1;
    }

    dvd.style.top = `${top}%`;
    dvd.style.left = `${left}%`;

}, 100);


let space = false;
const myProjectsReturn = document.querySelector("#my_projects_return");

window.addEventListener("keydown", event => {

    if (event.shiftKey && event.key === " " && !event.repeat) {
        space = !space;

        if (space === true) {
            myProjectsReturn.classList.remove("hidden");

        }else {
            myProjectsReturn.classList.add("hidden");
        }
    }

});
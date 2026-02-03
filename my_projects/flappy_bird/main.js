const bird = document.getElementById("bird");

const background_bottom = document.getElementById("background_bottom");
const background_top = document.getElementById("background_top");

const pipe = document.getElementById("pipe");
const pipe_top = document.getElementById("pipe_top");
const pipe_bottom = document.getElementById("pipe_bottom");

const pipes = document.getElementById("pipes");

const overlay_left = document.getElementById("overlay_left");
const overlay_right = document.getElementById("overlay_right");

pipe.style.gap = (Math.floor(Math.random() * (185 - 145 + 1)) + 145).toString() + "%"; //Mexe no gap dos 'pipe' entre 145% e 185%
pipe.style.top = (Math.floor(Math.random() * (41)) - 50).toString() + "%"; //Mexe no top dos 'pipe' entre -10% e -50%

// document.body.appendChild(pipe.cloneNode(true));


let birdSpeed = 5;
let freeMove = false;

let birdBoost = 0;
// let canJump = true;

let isGravity = false;

// Delta Time variables
let lastTimestamp = 0;
let deltaTimeMs = 0;
let deltaTimeSec = 0;


function update(timestamp) {
    // Request the next frame
    requestAnimationFrame(update);
    
    // Skip first frame (lastTimestamp is 0)
    if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
        return;
    }
    
    // Calculate delta time in milliseconds
    deltaTimeMs = timestamp - lastTimestamp;
    
    // Convert to seconds for physics calculations
    deltaTimeSec = deltaTimeMs / 1000;
    
    // Store the current timestamp for the next frame
    lastTimestamp = timestamp;
    
    // Cap deltaTime to prevent huge jumps (e.g., when tab is inactive)
    if (deltaTimeSec > 0.1) deltaTimeSec = 0.1;
    
    if (!isGameOver){
        
        if(isGravity){
            if(!freeMove){
                gravity();
            }
        }
        
        groundRoofCollision();
    }
    groundMovement();
    pipeSpawn();
    pipeMove();
    birdPipeCollision();
}
// Tela absoluta (recomendado debug)
// console.log('Screen left:', background_top.getBoundingClientRect().left + 'px');

// Overlay Left
overlay_left.style.width = background_top.getBoundingClientRect().left + 'px';
overlay_left.style.height = "640px";

//Overlay Right
overlay_right.style.width = window.innerWidth - background_top.getBoundingClientRect().right + 'px';
overlay_right.style.height = "640px";
overlay_right.style.right = "0px";

// let pipeRollBack = false;

let i = 0;
let pipeQtd = 5;

function pipeSpawn(){

    if (i < pipeQtd){
        
        const pipesClone = pipe.cloneNode(true);
        pipesClone.id = `pipe${i}`;
        
        pipesClone.style.gap = (Math.floor(Math.random() * (185 - 145 + 1)) + 145).toString() + "%"; //Mexe no gap dos 'pipe' entre 145% e 185%
        pipesClone.style.top = (Math.floor(Math.random() * (41)) - 50).toString() + "%"; //Mexe no top dos 'pipe' entre -10% e -50%
        
        //Gap entre os 'pipe'
        // pipesClone.style.left = `${185 * i + 850}px`;
        pipesClone.style.left = `${8 * i + 65}vw`;
        document.body.appendChild(pipesClone);
        // console.log(i);

        i++;
    }   
}

window.addEventListener("keydown", (event) => {

    if(event.key.toLocaleLowerCase() === "b" && event.shiftKey && !event.repeat){
        freeMove = !freeMove;
    }

    if(freeMove){

        if(event.key.toLocaleLowerCase() === "w"){
            bird.style.top = ((parseFloat(getComputedStyle(bird).top) || 0) -birdSpeed) + "px"; 
        }
        if(event.key.toLocaleLowerCase() === "s"){
            bird.style.top = ((parseFloat(getComputedStyle(bird).top) || 0) +birdSpeed) + "px";
        }
        if(event.key.toLocaleLowerCase() === "a"){
            bird.style.left = ((parseFloat(getComputedStyle(bird).left) || 0) -birdSpeed) + "px"; 
        }
        if(event.key.toLocaleLowerCase() === "d"){
            bird.style.left = ((parseFloat(getComputedStyle(bird).left) || 0) +birdSpeed) + "px";
        }

    }else{

        if(event.key.toLocaleLowerCase() === " " && !event.repeat){
            
            if (!isGameOver){
                jump();
            }
        }

        // if(event.key.toLocaleLowerCase() === "a"){
        //     background_bottom.style.left = (parseFloat(getComputedStyle(background_bottom).left) -birdSpeed) + "px";
        // }
        // if(event.key.toLocaleLowerCase() === "d"){
        //     background_bottom.style.left = (parseFloat(getComputedStyle(background_bottom).left) +birdSpeed) + "px";
        // }
    }
    
});

function jump(){

    let jumpBoost = 7;
    isGravity = false;

    for (let i = 0; i <= jumpBoost; i++){

        setTimeout(function() {
            
            const currentTop = parseFloat(getComputedStyle(bird).top) || 0;
            bird.style.top = (currentTop - (i + 1)) + "px";
            
            if (i === jumpBoost){
                // Espera 0.1 segundos após o pulo terminar para reativar gravidade
                setTimeout(function() {
                    isGravity = true;
                }, 100);
            }
        }, 4 * i);
    }
}

let gravityForce = 300; // pixels por segundo

function gravity(){
    bird.style.top = ((parseFloat(getComputedStyle(bird).top) || 0) +gravityForce * deltaTimeSec) + "px";
}

const pageHeight = window.innerHeight;

let background_topBottom = background_top.getBoundingClientRect().bottom;

// console.log(background_top.getBoundingClientRect().bottom);

let isGameOver = false;

function groundRoofCollision(){
    const birdPosition = parseFloat(getComputedStyle(bird).top) || 0;

    if (birdPosition > background_topBottom - 24){
        isGameOver = true;

    }else if (birdPosition < -10){
        isGameOver = true;
    }

    // console.log(birdPosition);
}

let groundSpeed = 150;

function groundMovement(){
    const backgroundBottomPosition = (parseFloat(getComputedStyle(background_bottom).left) || 0);
    
    // console.log(backgroundBottomPosition);
    
    if (backgroundBottomPosition < -16){
        background_bottom.style.left = parseFloat("0") + "px";
    }else{
        background_bottom.style.left = ((parseFloat(getComputedStyle(background_bottom).left) || 0) -groundSpeed * deltaTimeSec) + "px";
    }
}

function birdPipeCollision(){
    
    //Bird:
    const birdPositionTop = bird.getBoundingClientRect().top; //Top
    const birdPositionRight = bird.getBoundingClientRect().right; //Right
    const birdPositionLeft = bird.getBoundingClientRect().left; //Left
    const birdPositionBottom = bird.getBoundingClientRect().bottom; //Bottom
    
    //PIPE_TOP:
    const leftPipeTop = pipe_top.getBoundingClientRect().left; //Left
    const bottomPipeTop = pipe_top.getBoundingClientRect().bottom; //Bottom
    const rightPipeTop = pipe_top.getBoundingClientRect().right; //Right

    //PIPE_BOTTOM:
    const leftPipeBottom = pipe_bottom.getBoundingClientRect().left; //Left
    const topPipeBottom = pipe_bottom.getBoundingClientRect().top; //Bottom
    const rightPipeBottom = pipe_bottom.getBoundingClientRect().right; //Right

    //Colisão com o pipe de cima: overlap horizontal + parte superior do pássaro acima do fundo do pipe
    if(birdPositionRight > leftPipeTop && birdPositionTop < bottomPipeTop && birdPositionLeft < rightPipeTop){
        console.log("pipe_top");
    }

    //Colisão com o pipe de baixo: overlap horizontal + parte inferior do pássaro abaixo do topo do pipe
    if (birdPositionRight > leftPipeBottom && birdPositionLeft < rightPipeBottom && birdPositionBottom > topPipeBottom) {
        console.log("pipe_bottom");
    }

}

let pipeSpeed = 5;

// function pipeMove(){
//     const pipesXPosition = (parseFloat(getComputedStyle(pipes).left) || 0);
//     console.log(pipesXPosition);
    
//     if (pipesXPosition < -50){
//         pipes.style.left = parseFloat("650") + "px";
//     }else {
//         pipes.style.left = ((parseFloat(getComputedStyle(pipes).left) || 0) -pipeSpeed * deltaTimeSec) + "px";
//         pipeRollBack = !pipeRollBack;
//     }
// }

// let x = 0;
// function pipeMove(){
//     x++;
//     const pipeClone = document.getElementById(`pipe${x}`);
//     if(x > 4){
//         x = 0;
//     }
//     if(pipeClone){
//         pipeClone.style.left = ((parseFloat(getComputedStyle(pipeClone).left) || 0) -pipeSpeed * deltaTimeSec) + "px"
//     } 
// }

function pipeMove(){

    // Move TODOS clones suavinho com delta
    document.querySelectorAll('.pipes').forEach(i => {
        
        let leftPx = parseFloat(getComputedStyle(i).left) || 0;
        let leftVw = (leftPx / window.innerWidth) * 100;  // % viewport width

        // Usa:
        // console.log(`${leftVw.toFixed(2)}vw`);

        // let left = parseFloat(getComputedStyle(i).left) || 0;
        
        i.style.left = (leftVw - pipeSpeed * deltaTimeSec) + 'vw';
        
        // Reset quando sai tela (reuse infinito)
        if (leftVw < 25) {  // ajuste -350 pro seu pipe width
            i.style.left = '65vw';
        }
    });
}

// Debug: single shared interval to log positions every 500ms.
const DEBUG_INTERVAL_MS = 500;
let debugTimerId = null;
function startDebugInterval() {
    if (debugTimerId !== null) return; // already running
    debugTimerId = setInterval(() => {
        // stop logging when the game is over
        if (isGameOver) {
            clearInterval(debugTimerId);
            debugTimerId = null;
            return;
        }

        const birdPositionTop = bird.getBoundingClientRect().top;
        const birdPositionRight = bird.getBoundingClientRect().right;
        const birdPositionLeft = bird.getBoundingClientRect().left;

        const leftPipeTop = pipe_top.getBoundingClientRect().left;
        const bottomPipeTop = pipe_top.getBoundingClientRect().bottom;
        const rightPipeTop = pipe_top.getBoundingClientRect().right;

        console.clear();
        console.log(`bird_top: ${birdPositionTop} | bird_left: ${birdPositionLeft} | bird_right: ${birdPositionRight}\npipe_right: ${rightPipeTop} | pipe_left: ${leftPipeTop} | pipe_bottom: ${bottomPipeTop}`);
    }, DEBUG_INTERVAL_MS);
}
// startDebugInterval();

update();
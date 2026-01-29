const bird = document.getElementById("bird");

const background_bottom = document.getElementById("background_bottom");
const background_top = document.getElementById("background_top");

const pipes = document.getElementById("pipes");
const pipe_top = document.getElementById("pipe_top");
const pipe_bottom = document.getElementById("pipe_bottom");

// let i = parseFloat(getComputedStyle(pipe_top).top) || 0;

pipes.style.gap = (Math.floor(Math.random() * (185 - 145 + 1)) + 145).toString() + "%"; //Mexe no gap dos 'pipes' entre 145% e 185%
pipes.style.top = (Math.floor(Math.random() * (41)) - 50).toString() + "%"; //Mexe no top dos 'pipes' entre -10% e -50%

// //Pega o 'left' e 'bottom' do 'pipe_top'
// let leftPipeTop = pipe_top.getBoundingClientRect().left;
// let bottomPipeTop = pipe_top.getBoundingClientRect().bottom;

// //Pega o 'left' e 'top' do 'pipe_bottom'
// let leftPipeBottom = pipe_bottom.getBoundingClientRect().left;
// let topPipeBottom = pipe_bottom.getBoundingClientRect().top;

//Printa as posições dos 'pipes' 
// console.log(`pipe_top: left: ${leftPipeTop}, bottom: ${bottomPipeTop}`);
// console.log(`pipe_bottom: left: ${leftPipeBottom}, top: ${topPipeBottom}`);

let birdSpeed = 5;
let freeMove = true;

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
    birdPipeCollision();
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

    let jumpBoost = 10;
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
        }, 7 * i);
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
startDebugInterval();

update();
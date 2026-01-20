const display = document.getElementById("display");

window.addEventListener("keydown", (event) => {
    
    if (event.key === "0" && !event.repeat){
        display.value += "0";
    }
    if (event.key === "1" && !event.repeat){
        display.value += "1";
    }
    if (event.key === "2" && !event.repeat){
        display.value += "2";
    }
    if (event.key === "3" && !event.repeat){
        display.value += "3";
    }
    if (event.key === "4" && !event.repeat){
        display.value += "4";
    }
    if (event.key === "5" && !event.repeat){
        display.value += "5";
    }
    if (event.key === "6" && !event.repeat){
        display.value += "6";
    }
    if (event.key === "7" && !event.repeat){
        display.value += "7";
    }
    if (event.key === "8" && !event.repeat){
        display.value += "8";
    }
    if (event.key === "9" && !event.repeat){
        display.value += "9";
    }
    
});
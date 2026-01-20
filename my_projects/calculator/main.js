let num1 = "";
let num2 = "";

let plus = false;

const display = document.getElementById("display");

console.log(Number("445") + Number("555"));

window.addEventListener("keydown", (event) => {
    if (plus === false){

        if (event.key === "0" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "1" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "2" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "3" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "4" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "5" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "6" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "7" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "8" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
        if (event.key === "9" && !event.repeat){
            num1 = event.key;
            display.value += num1;
        }
    }

    if (event.key === "+" && !event.repeat){
        plus = true;
        display.value = "";
    }

    if (plus === true){
    
        if (event.key === "0" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "1" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "2" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "3" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "4" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "5" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "6" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "7" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "8" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
        if (event.key === "9" && !event.repeat){
            num2 = event.key;
            display.value += num2;
        }
    }
    
    if (event.key === "Enter" && !event.repeat){
        display.value = Number(num1) + Number(num2);
        num1 = "";
        num2 = "";
        // plus = false;
    }

    if (event.key === "Backspace" && !event.repeat){
        display.value = "";
        num1 = "";
        num2 = "";
        // plus = false;
    }

});
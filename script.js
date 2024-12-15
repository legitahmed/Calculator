let screen_text = ''
let screen = document.getElementById('screen')

function updateDisplay() {
    screen.innerText = screen_text;
}

let variable1 = ''
let variable2 = ''
function handleInput(number) {
    screen_text += number;
    if (!operatorPressed) {
        variable1 += number; 
        console.log("Updated variable1: ", variable1);
    } else {
        variable2 += number; 
        console.log("Updated variable2: ", variable2);
    }
    updateDisplay();
}

document.getElementById("1").addEventListener("click", () => handleInput("1"));
document.getElementById("2").addEventListener("click", () => handleInput("2"));
document.getElementById("3").addEventListener("click", () => handleInput("3"));
document.getElementById("4").addEventListener("click", () => handleInput("4"));
document.getElementById("5").addEventListener("click", () => handleInput("5"));
document.getElementById("6").addEventListener("click", () => handleInput("6"));
document.getElementById("7").addEventListener("click", () => handleInput("7"));
document.getElementById("8").addEventListener("click", () => handleInput("8"));
document.getElementById("9").addEventListener("click", () => handleInput("9"));
document.getElementById("0").addEventListener("click", () => handleInput("0"));
document.getElementById(".").addEventListener("click", () => handleInput("."));

let operatorPressed = false
let currentOperator = null
const operators = document.querySelectorAll('.operator');
operators.forEach(button => {
    button.addEventListener('click', e => {
        if (variable1 !== '' && variable2 === '') {
            operatorPressed = true;
            currentOperator = e.target.innerText;  // Get the clicked operator
            screen_text += currentOperator; // Update screen display
            updateDisplay();
        }
    });
});

function handleOperator(operator) {
    if ( variable1 !== '' && variable2 !== '') {
        operate(currentOperator); // handle an operation before doing the next one
    }
    currentOperator = operator;
    operatorPressed = true;
}

document.getElementById("+").addEventListener("click", () => handleOperator("+"));
document.getElementById("-").addEventListener("click", () => handleOperator("-"));
document.getElementById("*").addEventListener("click", () => handleOperator("×"));
document.getElementById("/").addEventListener("click", () => handleOperator("÷"));
document.getElementById("%").addEventListener("click", () => handleOperator("%"));

function operate(currentOperator) {
    // Parse the numbers from variable1 and variable2
    let num1 = parseFloat(variable1);
    let num2 = parseFloat(variable2);
    let result = 0;
    
    switch (currentOperator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "%":
            result = num1 % num2;
            break;
        case "÷":
            if (num2 === 0) {
                screen_text = "Error: Division by zero";
                updateDisplay();
                return;
            }
            result = num1 / num2;
            break;
    }

    screen_text = result + currentOperator
    updateDisplay();

    // Update variable1 to hold the result for future operations
    variable1 = result.toString();
    variable2 = '';  // Clear variable2 for the next input
    operatorPressed = false;  // Reset operatorPressed flag
}


function operateEqual(currentOperator) {
    // Parse the numbers from variable1 and variable2
    let num1 = parseFloat(variable1);
    let num2 = parseFloat(variable2);


    let result = 0;

    switch (currentOperator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "%":
            result = num1 % num2;
            break;
        case "÷":
            if (num2 === 0) {
                screen_text = "Error: Division by zero";
                updateDisplay();
                return;
            }
            result = num1 / num2;
            break;
    }

    screen_text = result 
    updateDisplay();

    // Update variable1 to hold the result for future operations
    variable1 = result.toString();
    variable2 = '';  // Clear variable2 for the next input
    operatorPressed = false;  // Reset operatorPressed flag
}

document.getElementById("equal").addEventListener("click", () => operateEqual(currentOperator));

function AC() {
    variable1 = '';
    variable2 = '';
    result = 0;
    operatorPressed = false; 
    screen_text = '';
    currentOperator = null;

    updateDisplay();
}

document.getElementById("clear").addEventListener("click", AC); 


/*
TO DO:
      update the current operator in the funtion operateEqual dynamically
      implment a backspace function
      review the whole project again 
*/
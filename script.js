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

["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].forEach(id => {
    document.getElementById(id).addEventListener("click", () => handleInput(id));
});

let operatorPressed = false
let currentOperator = null
const operators = document.querySelectorAll('.operator');
operators.forEach(button => {
    button.addEventListener('click', e => {
        const operator = e.target.innerText; // Get the clicked operator

        // If both variables are set, calculate the result before moving to the next operator
        if (variable1 !== '' && variable2 !== '') {
            operate(currentOperator); // Perform the previous operation
        }

        // Update the current operator and set operatorPressed
        currentOperator = operator;
        operatorPressed = true;

        // Update the screen to show the new operator
        screen_text = variable1 + currentOperator; // Only variable1 and the new operator
        updateDisplay();
    });
});

function operate(currentOperator, withOperator = true) {
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

    variable1 = result.toString();
    variable2 = ''; 
    screen_text = withOperator ? variable1 + currentOperator : variable1;
    updateDisplay();
    operatorPressed = false;
}

document.getElementById("equal").addEventListener("click", () => operate(currentOperator, false));

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

function backSpace() {
    let arr = screen_text.split(""); //split the string into an array of charchters 
    arr.pop(); // Remove the last character
    screen_text = arr.join(''); // Join the array back into a string and update the global screen_text
    updateDisplay(); // Refresh the display

    if (operatorPressed) {
        let arr2 = variable2.split('');
        arr2.pop();
        variable2 = arr2.join('')
    }
    else {
        let arr1 = variable1.split('');
        arr1.pop()
        variable1 = arr1.join('')
    }
}


document.getElementById("delete").addEventListener("click", backSpace); 


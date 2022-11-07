let displayValue = 0;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
        default:
            return;
    } 
}

let buttons = document.querySelectorAll('#calculator-container button');
// let calculatorOperatorButtons = document.querySelectorAll('#calculator-container .operator');
let calculatorDisplay = document.getElementById('calculator-display');
let operand1 = [];
let operand2 = [];
let operator = '';
let result;

for(const button of buttons) {
    button.addEventListener("click", function() {
        
        switch (button.value) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if(operand1.length == 0) {
                    operand1.push(button.value);
                    calculatorDisplay.innerHTML += button.value;
                } else {
                    operand2.push(button.value);
                    calculatorDisplay.innerHTML = button.value;
                }
                break;
            case '+':
            case '-':
            case '/':
            case '*':
                if(operand2.length == 0) {
                    operand1 = operand1.join('');
                } else {
                    operand1 = operate(operator, operand1, operand2);
                    operand2 = [];
                }
                operator = button.value;
                break;
            case '=':
                // operand1 = operand1.join('');
                operand2 = operand2.join('');
                result = operate(operator, +operand1, +operand2);
                calculatorDisplay.innerHTML = result;
                operand1 = [result]
                operand2 = [];
                operator = '';
                break;
            default:

        }

    });
}









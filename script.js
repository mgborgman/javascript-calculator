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

function clearScreen() {
    calculatorDisplay.innerHTML = '';
}

function clearScreenAndCurrentVariable() {
    if(typeof operand1 !== 'undefined' && operator == '') {
        operand1 = [];
    } else if(typeof operand1 !== 'undefined' && operator !== '') {
        operand2 = [];
    }
    calculatorDisplay.innerHTML = '';
}

function allClear() {
    operand1 = ['0'];
    operand2 = ['0'];
    operator = '';
    result = 0;
}

let buttons = document.querySelectorAll('#calculator-container button');
// let calculatorOperatorButtons = document.querySelectorAll('#calculator-container .operator');
let calculatorDisplay = document.getElementById('calculator-display');
let decimalButton = document.getElementById('decimal');
let operand1 = ['0'];
let operand2 = ['0'];
let operator = '';
let result;
calculatorDisplay.innerHTML = operand1;

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
            case '.':
                if(operand1.length == 1 && (operand1[0] == '0' || operand1[0] == 0) && operator == '') {
                    const index = operand1.indexOf('0');
                    operand1.splice(index, 1, button.value);
                    calculatorDisplay.innerHTML = button.value;
                } else if(operand1.length >= 1 && operator == '') {
                    operand1.push(button.value);
                    if(operand1.includes('.')) {
                        decimalButton.disabled = true;
                    } else {
                        decimalButton.disabled = false;
                    }
                    calculatorDisplay.innerHTML += button.value;
                } else {
                    decimalButton.disabled = false;
                    operand2.push(button.value);
                    if(operand2.includes('.')) {
                        decimalButton.disabled = true;
                    } else {
                        decimalButton.disabled = false;
                    }
                    clearScreen();
                    calculatorDisplay.innerHTML += button.value;
                }
                break;
            case '+':
            case '-':
            case '/':
            case '*':
                if(operand2.length == 1 && operand2[0] == '0') {
                    operand1 = operand1.join('');
                } else {
                    operand1 = operate(operator, operand1, operand2);
                    operand2 = ['0'];
                }
                operator = button.value;
                break;
            case '=':
                // operand1 = operand1.join('');
                operand2 = operand2.join('');
                result = operate(operator, +operand1, +operand2);
                calculatorDisplay.innerHTML = result;
                operand1 = [result]
                operand2 = ['0'];
                operator = '';
                break;
            case 'c':
                clearScreenAndCurrentVariable();
                break;
            case 'ac':
                clearScreen();
                allClear();
                calculatorDisplay.innerHTML = operand1;
            default:

        }

    });
}









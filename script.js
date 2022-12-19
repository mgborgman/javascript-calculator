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
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      break;
  }
}

function clearScreen() {
  calculatorDisplay.innerHTML = "";
}

function clearScreenAndCurrentVariable() {
  if (
    typeof operand1 !== "undefined" &&
    operator !== "" &&
    typeof operand2 !== "undefined"
  ) {
    operand2 = ["0"];
  } else if (typeof operand1 !== "undefined" && operator !== "") {
  } else if (typeof operand1 !== "undefined" && operator == "") {
    operand1 = ["0"];
  }
  calculatorDisplay.innerHTML = "";
}

function allClear() {
  operand1 = ["0"];
  operand2 = ["0"];
  operator = "";
  result = 0;
}

const buttons = document.querySelectorAll("#calculator-container button");
// let calculatorOperatorButtons = document.querySelectorAll('#calculator-container .operator');
let calculatorDisplay = document.getElementById("calculator-display");
const decimalButton = document.getElementById("decimal");
let operand1 = ["0"];
let operand2 = ["0"];
let operator = "";
let result;
calculatorDisplay.innerHTML = operand1;
decimalButton.disabled = false;

// eslint-disable-next-line no-restricted-syntax
for (const button of buttons) {
  // eslint-disable-next-line no-loop-func
  button.addEventListener("click", () => {
    switch (button.value) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        if (
          operand1.length === 1 &&
          (operand1[0] === "0" || operand1[0] === 0) &&
          operator === ""
        ) {
          const index = operand1.indexOf("0");
          operand1.splice(index, 1, button.value);
          calculatorDisplay.innerHTML = button.value;
        } else if (operand1.length >= 1 && operator === "") {
          operand1.push(button.value);
          if (operand1.includes(".")) {
            decimalButton.disabled = true;
          } else {
            decimalButton.disabled = false;
          }
          calculatorDisplay.innerHTML += button.value;
        } else {
          decimalButton.disabled = false;
          operand2.push(button.value);
          if (operand2.includes(".")) {
            decimalButton.disabled = true;
          } else {
            decimalButton.disabled = false;
          }
          calculatorDisplay.innerHTML += button.value;
        }
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        if (operand2.length == 1 && operand2[0] == "0") {
          operand1 = operand1.join("");
        } else {
          operand1 = operate(operator, operand1, operand2);
          operand2 = ["0"];
        }
        clearScreen();
        operator = button.value;
        decimalButton.disabled = false;
        break;
      case "=":
        // operand1 = operand1.join('');
        decimalButton.disabled = false;
        operand2 = operand2.join("");
        result = operate(operator, +operand1, +operand2);
        calculatorDisplay.innerHTML = result;
        operand1 = [result];
        operand2 = ["0"];
        operator = "";
        break;
      case "c":
        clearScreenAndCurrentVariable();
        decimalButton.disabled = false;
        break;
      case "ac":
        clearScreen();
        allClear();
        calculatorDisplay.innerHTML = operand1;
        decimalButton.disabled = false;
      default:
    }
  });
}

// eslint-disable-next-line no-restricted-globals
addEventListener("keydown", (event) => {
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      if (
        operand1.length === 1 &&
        (operand1[0] === "0" || operand1[0] === 0) &&
        operator === ""
      ) {
        const index = operand1.indexOf("0");
        operand1.splice(index, 1, event.key);
        calculatorDisplay.innerHTML = event.key;
      } else if (operand1.length >= 1 && operator === "") {
        operand1.push(event.key);
        if (operand1.includes(".")) {
          decimalButton.disabled = true;
        } else {
          decimalButton.disabled = false;
        }
        calculatorDisplay.innerHTML += event.key;
      } else {
        decimalButton.disabled = false;
        operand2.push(event.key);
        if (operand2.includes(".")) {
          decimalButton.disabled = true;
        } else {
          decimalButton.disabled = false;
        }
        calculatorDisplay.innerHTML += event.key;
      }
      break;
    case "+":
    case "-":
    case "/":
    case "*":
      if (operand2.length == 1 && operand2[0] == "0") {
        operand1 = operand1.join("");
      } else {
        operand1 = operate(operator, operand1, operand2);
        operand2 = ["0"];
      }
      clearScreen();
      operator = event.key;
      decimalButton.disabled = false;
      break;
    case "=":
      // operand1 = operand1.join('');
      decimalButton.disabled = false;
      operand2 = operand2.join("");
      result = operate(operator, +operand1, +operand2);
      calculatorDisplay.innerHTML = result;
      operand1 = [result];
      operand2 = ["0"];
      operator = "";
      break;
    case "c":
      clearScreenAndCurrentVariable();
      decimalButton.disabled = false;
      break;
    case "ac":
      clearScreen();
      allClear();
      calculatorDisplay.innerHTML = operand1;
      decimalButton.disabled = false;
    default:
  }
});

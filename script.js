const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = null;
let awaitingNextValue = false;
let operatorValue = "";

function addNumberValue(number) {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent =
            displayValue === "0" ? number : displayValue + number;
    }
}

const calculator = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    // Allow changing the operator before entering the next number
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }

    // Store the first number
    if (firstValue === null) {
        firstValue = currentValue;
    } else {
        // Perform the calculation
        const calculation = calculator[operatorValue](firstValue, currentValue);

        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }

    awaitingNextValue = true;
    operatorValue = operator;
}

function addDecimal() {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = "0.";
        awaitingNextValue = false;
        return;
    }

    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent += ".";
    }
}

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () =>
            addNumberValue(inputBtn.value)
        );
    } else if (inputBtn.classList.contains("operator")) {
        inputBtn.addEventListener("click", () =>
            useOperator(inputBtn.value)
        );
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", addDecimal);
    }
});

function resetAll() {
    firstValue = null;
    operatorValue = "";
    awaitingNextValue = false;
    calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);
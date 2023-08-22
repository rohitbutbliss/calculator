// Selecting the elements from the DOM
const bigScreen = document.querySelector(".big-screen");
const smallScreen = document.querySelector(".small-screen");
const decimalKey = document.querySelector(".decimal-point");
const additionKey = document.querySelector(".add-key");
const subtractionKey = document.querySelector(".subtract-key");
const multiplicationKey = document.querySelector(".multiply-key");
const divisionKey = document.querySelector(".divide-key");
const deleteKey = document.querySelector(".del-btn");
const clearKey = document.querySelector(".all-clear");
const equalKey = document.querySelector(".equal-key");

// Adding event listeners to the operator keys
additionKey.addEventListener('click', (e) => addOperatorToScreen('+'));
subtractionKey.addEventListener('click', (e) => addOperatorToScreen('-'));
multiplicationKey.addEventListener('click', (e) => addOperatorToScreen('*'));
divisionKey.addEventListener('click', (e) => addOperatorToScreen('/'));

// Adding event listeners to the delete, clear and equal keys
deleteKey.addEventListener('click', clearOneCharacter);
clearKey.addEventListener('click', clearScreen);
equalKey.addEventListener('click', completeTheCalculation);

// Initializing the variables
let decimalValue = false;
let firstValue = 0;
let secondValue = null;
let operator = null;

// Adding event listener to the decimal key
decimalKey.addEventListener('click', function (e) {
    addDecimalToScreen('.');
});

// Adding event listeners to the number keys
for (let i = 0; i <= 9; i++) {
    const numberKeyDiv = document.querySelector(`.num-${i}`);
    numberKeyDiv.addEventListener('click', function (e) {
        addNumberToScreen(i.toString());
    });
}

// Adding event listener for keyboard input
document.addEventListener('keyup', function (e) {
    let keyValue = e.key;
    if (keyValue >= '0' && keyValue <= '9') {
        addNumberToScreen(keyValue);
    }
    else if (keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/') {
        e.preventDefault();
        addOperatorToScreen(keyValue);
    }
    else if (keyValue === '=' || keyValue === 'Enter') {
        completeTheCalculation();
    }

    else if (keyValue === '.') {
        addDecimalToScreen(keyValue);
    }

    else if (keyValue === 'c') {
        clearScreen();
    }

    else if (keyValue === 'Backspace') {
        clearOneCharacter();
    }
});

// Function to add number to the screen
function addNumberToScreen(keyValue) {
    let currentValue = +bigScreen.innerText;

    if (bigScreen.innerText.length > 11) return;


    if (!decimalValue) {
        currentValue *= 10;
        currentValue += +keyValue;
    } else {
        currentValue = bigScreen.innerText + keyValue;
    }

    if (secondValue === null) firstValue = parseFloat(currentValue);
    else secondValue = parseFloat(currentValue);

    bigScreen.innerText = `${currentValue}`;
    let smallScreenText = smallScreen.innerText;
    if (smallScreenText === '0') {
        smallScreen.innerText = '';
    }
    if (secondValue !== null && secondValue !== 0) smallScreen.innerText = smallScreen.innerText + keyValue;
    else if (secondValue === null) smallScreen.innerText = smallScreen.innerText + keyValue;
}

// Function to add decimal to the screen
function addDecimalToScreen(keyValue) {
    if (decimalValue) return;
    smallScreen.innerText = smallScreen.innerText + keyValue;
    decimalValue = true;
    bigScreen.innerText = bigScreen.innerText + keyValue;
}

// Function to add operator to the screen
function addOperatorToScreen(keyValue) {
    if (secondValue !== null && secondValue !== 0) {
        performOperation();
    }
    else if (secondValue === 0) {
        smallScreen.innerText = smallScreen.innerText.slice(0, smallScreen.innerText.length - 1);
    };


    operator = keyValue;
    secondValue = 0;
    decimalValue = false;
    bigScreen.innerText = '0';
    smallScreen.innerText = smallScreen.innerText + keyValue;
}

// Function to complete the calculation
function completeTheCalculation() {
    if (secondValue !== null) {
        if (performOperation()) {
            bigScreen.innerText = `${firstValue}`;
            if (!Number.isInteger(firstValue)) decimalValue = true;
        };
    }
    else return;
}

// Function to perform the operation
function performOperation() {
    if (secondValue === null) return false;
    if (operator === '+') {
        firstValue = (firstValue) + secondValue;
    }
    else if (operator === '-') {
        firstValue = (firstValue) - secondValue;
    }
    else if (operator === '*') {
        firstValue = (firstValue) * secondValue;
    }
    else if (operator === '/') {
        if (secondValue === 0) return false;
        firstValue = (firstValue) / secondValue;
    }

    // Converting value to exponential form if value is too big
    if (firstValue.toString().length > 12) {
        firstValue = firstValue.toExponential(12);
    }

    firstValue = parseFloat(firstValue);

    operator = null;
    secondValue = null;
    decimalValue = false;
    smallScreen.innerText = `${firstValue}`;

    return true;
}

// Function to clear the screen
function clearScreen() {
    smallScreen.innerText = 0;
    bigScreen.innerText = 0;
    operator = null;
    decimalValue = false;
    firstValue = 0;
    secondValue = null;
}

// Function to clear one character
function clearOneCharacter() {

    let newValue = bigScreen.innerText.slice(0, -1);
    if (newValue === "") newValue = "0";
    bigScreen.innerText = `${newValue}`;

    // If second value is null that means it needs to change first value else it will change second value
    if (secondValue === null) {
        firstValue = parseFloat(bigScreen.innerText);
        smallScreen.innerText = `${bigScreen.innerText}`;
        if (!bigScreen.innerText.includes(".")) {
            decimalValue = false;
        }
    }
    else {
        secondValue = parseFloat(bigScreen.innerText);
        if (secondValue !== 0) {
            smallScreen.innerText = smallScreen.innerText = `${firstValue}${operator}${secondValue}`;
        } else {
            smallScreen.innerText = smallScreen.innerText = `${firstValue}${operator}`;
        }
        if (!bigScreen.innerText.includes(".")) {
            decimalValue = false;
        }
    }


}
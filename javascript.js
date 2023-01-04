const add = (a, b) => {
	return a + b;
};
const subtract = (a, b) => {
	return a - b;
};
const multiply = (a, b) => {
	return a * b;
};
const divide = (a, b) => {
	return a / b;
};

const operate = (operator, a, b) => {
    let result = 0;
    if (operator == '+')
        result = add(a, b);
    if (operator == '-')
        result = subtract(a, b);
    if (operator == 'x')
        result = multiply(a, b);
    if (operator == '/')
        result = divide(a, b);
    return Number(result.toFixed(3));
};

let output = document.querySelector('#output');
let displayValue = output.textContent;
let firstNumber = 0;
let secondNumber = 0;
let operator = '';
let justEvaluated = false;

let numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(btn => btn.addEventListener('click', (e) => {
    justEvaluated = false;
    if (displayValue == '0') {
        output.textContent = e.target.innerText;
        displayValue = output.textContent;
    }
    else
        output.textContent = output.textContent + e.target.innerText;
    displayValue = output.textContent;
}));

let operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach(btn => btn.addEventListener('click', (e) => {
    justEvaluated = false;
    if (displayValue.includes(' /') || displayValue.includes(' x') || displayValue.includes(' -') || displayValue.includes(' +')) {
        evaluate();
    }
    firstNumber = Number(displayValue);
    operator = e.target.innerText;
    output.textContent = displayValue + ' ' + operator + ' ';
    displayValue = output.textContent;
}));

let equalsButton = document.querySelector('.equals-button');
equalsButton.addEventListener('click', (e) => {
    evaluate();
});

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', (e) => {
    output.textContent = 0;
    displayValue = output.textContent;
});

function evaluate() {
    // firstNumber = Number(displayValue);
    secondNumber = Number(displayValue.split(' ')[2]);
    output.textContent = operate(operator, firstNumber, secondNumber);
    justEvaluated = true;
    displayValue = output.textContent;
}

let deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', (e) => {
    if (displayValue != '0' && !justEvaluated)
        output.textContent = output.textContent.slice(0, -1);
});
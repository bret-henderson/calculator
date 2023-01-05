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
    return Number(result.toFixed(5));
};

let output = document.querySelector('#output');
let displayValue = output.textContent;
let firstNumber = 0;
let secondNumber = 0;
let operator = '';
let justEvaluated = false;
let secondNumberExists = false;

let numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(btn => btn.addEventListener('click', (e) => pressNumber(e)));

let operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach(btn => btn.addEventListener('click', (e) => pressOperator(e)));

let equalsButton = document.querySelector('.equals-button');
equalsButton.addEventListener('click', () => pressEquals());

let deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => pressDelete());

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => pressClear());

document.addEventListener('keydown', (e) => {
    // console.log(e.key)
    if(e.key === 'Enter')
        pressEquals()
    if(e.key === 'Backspace')
        pressDelete()
    if(e.key.match(/[.0123456789]/) !== null)
        pressNumber(e)
    if(e.key.match(/[/*\-+]/) !== null)
        pressOperator(e)

    e.target.blur()
});

function evaluate() {
    if (!justEvaluated) {
        secondNumber = Number(displayValue.split(' ')[2]);
        secondNumberExists = true;
    }
    output.textContent = operate(operator, firstNumber, secondNumber);
    justEvaluated = true;
    displayValue = output.textContent;
    firstNumber = Number(displayValue);
}

function pressEquals() {
    if (operator !== '' && secondNumberExists)
        evaluate();
}

function pressDelete() {
    if (displayValue.split(' ')[2] !== '' && displayValue.split(' ')[2] !== '0.')
        secondNumberExists = true;

    if (displayValue.length === 1)
        output.textContent = 0;
    else if (displayValue.split(' ')[2] === '0.')
        output.textContent = output.textContent.slice(0,-2);
    else if (displayValue !== '0' && !justEvaluated && displayValue.slice(-1) !== ' ')
        output.textContent = output.textContent.slice(0, -1);

    displayValue = output.textContent;
}

function pressClear() {
    secondNumberExists = false;
    output.textContent = 0;
    displayValue = output.textContent;
}

function pressNumber(e) {
    let numberText = e.target.innerText
    if (e.key !== undefined)
    numberText = e.key
    
    if (justEvaluated && !displayValue.includes(' ')) {
        justEvaluated = false;
        secondNumberExists = false;
        output.textContent = numberText;
        if (numberText === '.')
        output.textContent = 0 + numberText;
            displayValue = output.textContent;
        return;
    }
    justEvaluated = false;
    
    if (displayValue == '0' && numberText === '.')
        output.textContent = displayValue + numberText;
    else if (displayValue.split(' ')[2] === '' && numberText === '.')
        output.textContent = displayValue + '0' + numberText;
    else if (displayValue == '0')
        output.textContent = numberText;
    else if (!displayValue.includes(' ') && displayValue.includes('.') && numberText === '.')
        ;
    else if (displayValue.includes(' ') && displayValue.split(' ')[2].includes('.') && numberText === '.')
        ;
    else
        output.textContent = output.textContent + numberText;
    displayValue = output.textContent;
    if (displayValue.split(' ')[2] !== undefined && displayValue.split(' ')[2] !== '' && displayValue.split(' ')[2] !== '0.')
        secondNumberExists = true;
}

function pressOperator(e) {
    justEvaluated = false;
    secondNumberExists = false;

    let operatorText = e.target.innerText
    if (e.key !== undefined)
        operatorText = e.key
    if (operatorText === '*')
        operatorText = 'x'

    if (!displayValue.endsWith(' ') && !displayValue.endsWith('.') && (displayValue.includes(' / ') || displayValue.includes(' x ') || displayValue.includes(' - ') || displayValue.includes(' + '))) {
        console.log('evaluated')
        evaluate();
    }
    if (displayValue.endsWith('.') && !displayValue.includes(' ')){
        operator = operatorText;
        output.textContent = displayValue + '0' + ' ' + operator + ' ';
        firstNumber = Number(displayValue);
    }
    else if (!displayValue.includes(' ')) {
        operator = operatorText;
        output.textContent = displayValue + ' ' + operator + ' ';
        firstNumber = Number(displayValue);
    }
    else if (displayValue.endsWith(' ')) {
        let existingOperator = operator;
        operator = operatorText;
        output.textContent = output.textContent.replace(existingOperator, operator);
        firstNumber = Number(displayValue.split(' ')[0]);
    }
    displayValue = output.textContent;
}
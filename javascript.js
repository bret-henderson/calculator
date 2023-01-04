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
let secondNumberExists = false;

let numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(btn => btn.addEventListener('click', (e) => {
    if (justEvaluated && !displayValue.includes(' ')) {
        justEvaluated = false;
        secondNumberExists = false;
        output.textContent = e.target.innerText;
        if (e.target.innerText === '.')
            output.textContent = 0 + e.target.innerText;
        displayValue = output.textContent;
        return;
    }

    justEvaluated = false;
    if (displayValue == '0' && e.target.innerText === '.')
        output.textContent = displayValue + e.target.innerText;
    else if (displayValue.split(' ')[2] === '' && e.target.innerText === '.')
        output.textContent = displayValue + '0' + e.target.innerText;
    else if (displayValue == '0')
        output.textContent = e.target.innerText;
    else if (!displayValue.includes(' ') && displayValue.includes('.') && e.target.innerText === '.')
        ;
    else if (displayValue.includes(' ') && displayValue.split(' ')[2].includes('.') && e.target.innerText === '.')
        ;
    else
        output.textContent = output.textContent + e.target.innerText;
    displayValue = output.textContent;
    if (displayValue.split(' ')[2] !== undefined && displayValue.split(' ')[2] !== '' && displayValue.split(' ')[2] !== '0.')
        secondNumberExists = true;
}));

let operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach(btn => btn.addEventListener('click', (e) => {
    justEvaluated = false;
    secondNumberExists = false;
    // if (!displayValue.endsWith(' ') && !displayValue.endsWith('.'))
    //     evaluate();
    if (!displayValue.endsWith(' ') && !displayValue.endsWith('.') && (displayValue.includes(' / ') || displayValue.includes(' x ') || displayValue.includes(' - ') || displayValue.includes(' + '))) {
        console.log('evaluated')
        evaluate();
    }
    if (!displayValue.includes(' ')) {
        operator = e.target.innerText;
        output.textContent = displayValue + ' ' + operator + ' ';
        firstNumber = Number(displayValue);
    }
    else if (displayValue.endsWith(' ')) {
        let existingOperator = operator;
        operator = e.target.innerText;
        output.textContent = output.textContent.replace(existingOperator, operator);
        firstNumber = Number(displayValue.split(' ')[0]);
    }
    displayValue = output.textContent;
}));

let equalsButton = document.querySelector('.equals-button');
equalsButton.addEventListener('click', (e) => {
    if (operator !== '' && secondNumberExists)
        evaluate();
});

function evaluate() {
    console.log('evaluated')
    if (!justEvaluated) {
        secondNumber = Number(displayValue.split(' ')[2]);
        secondNumberExists = true;
    }
    output.textContent = operate(operator, firstNumber, secondNumber);
    justEvaluated = true;
    displayValue = output.textContent;
    firstNumber = Number(displayValue);
}

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', (e) => {
    secondNumberExists = false;
    output.textContent = 0;
    displayValue = output.textContent;
});

let deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', (e) => {
    if (Number(displayValue.split(' ')[2]) !== '' && Number(displayValue.split(' ')[2]) !== '0.')
        secondNumberExists = true;
    if (displayValue.length === 1)
        output.textContent = 0;
    else if (displayValue != '0' && !justEvaluated && displayValue.slice(-1) !== ' ')
        output.textContent = output.textContent.slice(0, -1);

    displayValue = output.textContent;
});
// by Snowyfor
const keyboard = document.querySelector('#keyboard');
const screen = document.querySelector('#screen');
const operations = "+-/*%";

let num1 = '';
let num2 = '';
let operator = '';
screen.textContent = '';

window.addEventListener('keydown', (e) => {
    handleKeyboardInput(e);
});

keyboard.addEventListener('click', (e) => {
    handleButtonClick(e);
});

function handleButtonClick(e) {
    let target = e.target;

    if (target.tagName === 'BUTTON') {
        console.log('Button clicked: ', target.id);  // Debugging line
        switch(target.id) {
            case 'clear':
                clearScreen();
                break;
            case 'del':
                deleteLast();
                break;
            case 'plus/minus':
                togglePlusMinus();
                break;
            case 'add':
            case 'sub':
            case 'mul':
            case 'div':
                handleOperator(target.textContent);
                break;
            case 'percent':
                handlePercent(target.textContent);
                break;
            case 'equal':
                calculateResult();
                break;
            case 'coma':
                handleDecimal();
                break;
            default:
                handleNumber(target.textContent);
                break;
        }
    }
}

function handleKeyboardInput(e) {
    console.log('Key pressed:', e.key); // Debugging line
    switch(e.key) {
        case 'Backspace':
            deleteLast();
            break;
        case 'Delete':
            clearScreen();
            break;
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
            handleNumber(e.key);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(e.key);
            break;
        case '%':
            handlePercent(e.key);
            break;
        case '.':
        case ',':
            handleDecimal();
            break;
        case '=':
        case 'Enter':
            calculateResult();
            break;
    }
}

function clearScreen() {
    screen.textContent = '';
    num1 = '';
    num2 = '';
    operator = '';
}

function deleteLast() {
    screen.textContent = screen.textContent.slice(0, -1);
    if (operator === '') {
        num1 = num1.slice(0, -1);
    } else {
        num2 = num2.slice(0,-1);
    }
}

function togglePlusMinus() {
    if (operator === '') {
        num1 = (num1.charAt(0) === '-') ? num1.slice(1) : '-' + num1;
        screen.textContent = num1;
    } else {
        num2 = (num2.charAt(0) === '-') ? num2.slice(1) : '-' + num2;
    }
}

function handleOperator(op) {
    if (op == '*') {  // change * to ×
        op = '×';
    }

    if (num1 !== '' && operator === '') {
        operator = op;
        screen.textContent += operator;
    } else if (num1 !== '' && operator !== '' && num2 !== '') { // if user add more than one operator
        let result = operate(operator, parseFloat(num1), parseFloat(num2));
        screen.textContent = result;
        num1 = result.toString();
        num2 = '';
        operator = op;
        screen.textContent += operator;
    }
}

function calculateResult() {
    if (num1 !== '' && num2 !== '' && operator !== '') {
        if(operator === '/' && num2 === '0') {
            screen.textContent = 'Error';
            num1 = '';
            num2 = '';
            operator = '';
        } else if(num1.includes('.') || num2.includes('.')) {  // if the number is decimal
            let result = operate(operator, parseFloat(num1), parseFloat(num2));
            screen.textContent = result.toFixed(2);
            num1 = result.toFixed(2);
            num2 = '';
            operator = '';
        }  else if(screen.textContent.includes('%')) {  // if the number include percent
            let result = operate(operator, parseFloat(num1), parseFloat(num2));
            screen.textContent = result.toFixed(2);
            num1 = result.toFixed(2);
            num2 = '';
            operator = '';
        } else {  // if the number is integer
            let result = operate(operator, parseFloat(num1), parseFloat(num2));
            screen.textContent = result;
            num1 = result.toString();
            num2 = '';
            operator = '';
        }
    }
}

function handleDecimal() {
    if (operator === '') {
        if (!num1.includes('.')) {
            screen.textContent += '.';
            num1 += '.';
        }
    } else {
        if (!num2.includes('.')) {
            screen.textContent += '.';
            num2 += '.';
        }
    }
}

function handleNumber(number) {
    if (operator === '' && screen.textContent.includes('%')) {  // if num1 include % & user directly input num2 (without input operator)
        screen.textContent += '×';
        operator = '×';
        console.log('hi');
    }

    screen.textContent += number;
    if(operator === '') {
        num1 += number;
    } else {
        num2 += number;
    }
    console.log('num1: ', num1);
    console.log('num2: ', num2);
}

function handlePercent(percent) {
    screen.textContent += percent;
    if(operator === '') {
        num1 = (parseFloat(num1) / 100).toString();
    } else {
        num2 = (parseFloat(num2) / 100).toString();
    }
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '/':
            return num1 / num2;
        case '%':
            return num1 % num2;
        default:
            return 0;
    }
}
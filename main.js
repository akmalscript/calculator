// Copyright Snowy Forest
const screen = document.querySelector('#screen');
const buttons = document.querySelector('#buttons');
const operators = ['+', '-', '*', '/'];

let num1 = '0';
let num2 = '';
let operator = '';
screen.textContent = '0';

// for handlePercent()
let percentAtNum1 = false;
let percentAtNum2 = false;

// Keyboard & Button listener
window.addEventListener('keydown', (e) => {
    handleKeyboardInput(e);
});

buttons.addEventListener('click', (e) => {
    handleButtonClick(e);
});

function handleButtonClick(e) {
    let target = e.target;
    if(target.tagName === 'BUTTON') {
        switch(target.id) {
            case 'clear':
                clearScreen();
                break;
            case 'plus/minus':
                togglePlusMinus();
                break;
            case 'percent':
                handlePercent(target.textContent);
                break;
            case 'del':
                deleteLast();
                break;
            case 'div':
            case 'mul':
            case 'sub':
            case 'add':
                handleOperator(target.textContent)
                break;
            case 'coma':
                handleDecimal();
                break;
            case 'equal':
                calculateResult();
                break;
            default:
                handleNumber(target.textContent);
                break;
        }
    }
}

function handleKeyboardInput(e) {
    switch(e.key) {
        case 'Delete':
        case 'Escape':
            clearScreen();
            break;
        case '%':
            handlePercent(e.key);
            break;
        case 'Backspace':
            deleteLast();
            break;
        case '/':
        case '*':
        case '-':
        case '+':
            handleOperator(e.key);
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
        case '.':
        case ',':
            handleDecimal()
            break;
        case '=':
            calculateResult();
            break;
    }
}

// Functionality
function clearScreen() {
    num1 = '0';
    num2 = '';
    operator = '';
    screen.textContent = '0';

    percentAtNum1 = false;
    percentAtNum2 = false;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return parseFloat(num1) + parseFloat(num2);
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return 0;
    }
}

function togglePlusMinus() {
    if(operator === '') {
        num1 = num1.charAt(0) === '-' ? num1.slice(1) : '-' + num1;
        screen.textContent = num1;
    } else {
        // if num2 exists then togglePlusMinus
        if(num2 !== '') {
            num2 = num2.charAt(0) === '-' ? num2.slice(1) : '-' + num2;

            adjustOutput();
        }
    }
}

// adjustOutput due to differece between operator logo(on the button) & javascript operator
function adjustOutput() {
    if(operator === '*') {
        screen.textContent = num1 + '×' + num2;
    } else if(operator === '/') {
        screen.textContent = num1 + '÷' + num2;
    } else {
        screen.textContent = num1 + operator + num2;
    }
}

function handleNumber(number) {
    // if num1 include '%' & user directly input num2 (without operator)
    if(operator === '' && screen.textContent.includes('%')) {
        num2 = number;
        operator = '*';
        screen.textContent += '×';
    }
    
    if(operator === '') {
        if(isOnlyZero(num1)) {
            screen.textContent = number;
            num1 = number;
        } else {
            screen.textContent += number;
            num1 += number;
        }
    } else {
        if(num2 !== '' && isOnlyZero(num2)) {
            num2 = number;

            adjustOutput();
        } else {
            screen.textContent += number;
            num2 += number;
        }
    }
}

// to check if number conatins only zeros
function isOnlyZero(num) {
    for(let i = 0; i < num.length; i++) {
        if(num[i] !== '0') {
            return false;
        }
    }
    return true;
}

function handlePercent(percent) {
    // The percentage should only be displayed when there is input on the screen
    if(num1 !== '') {
        if(operator === '') {
            // if num1 doesn't contain '%', we add '%' to the screen and divide num1 by 100
            if(!percentAtNum1) {
                screen.textContent += percent;
                num1 = (parseFloat(num1) / 100).toString();
                percentAtNum1 = true;
            }
        } else {
            // if num2 doesn't contain '%', we add '%' to the screen and divide num2 by 100
            if(!percentAtNum2) {  
                screen.textContent += percent;
                num2 = (parseFloat(num2) / 100).toString();
                percentAtNum2 = true;
            }
        }
    }
}

function deleteLast() {
    // the deleteLast should only be executed when there is number on the screen
    if(num1 !== '') {
        if(operator === '') {  //delete num1
            if(percentAtNum1) {  //delete '%'
                num1 = (num1 * 100).toString();
                percentAtNum1 = false;
            } else {  //delete number
                num1 = num1.slice(0, -1);
            }
            screen.textContent = screen.textContent.slice(0, -1);
        } else if(operators.includes(screen.textContent.slice(-1))) {  //delete operator
            screen.textContent = screen.textContent.slice(0, -1);
            operator = '';
        } else {  //delete num2
            if(percentAtNum2) {  //delete '%'
                screen.textContent = screen.textContent.slice(0, -1);
                num2 = parseInt(num2 * 100).toString();
                percentAtNum2 = false;
            } else {  //delete number
                screen.textContent = screen.textContent.slice(0, -1);
                num2 = num2.slice(0, -1);
            }
        }
    }
}

function handleOperator(op) {
    // change '×' & '÷' to '*' & '/' for calculation
    if(op === '×') op = '*';
    if(op === '÷') op = '/';

    // handle minus input in the beginning
    if((screen.textContent === '' || screen.textContent === '0' ) && op === '-') {
        num1 = op;
        screen.textContent = op;
    }

    // operator should only be displayed when there is number on the screen
    else if(num1 !== '') {
        if(operator === '' && num1 !== '-') {
            switch(op) {
                case '+':
                    operator = '+';
                    screen.textContent += '+';
                    break;
                case '-':
                    operator = '-';
                    screen.textContent += '-';
                    break;
                case '*':
                    operator = '*';
                    screen.textContent += '×';
                    break;
                case '/':
                    operator = '/';
                    screen.textContent += '÷'    
                    break;
            }
        }
        
        // if user add more than one operator after num2
        else if(operator !== '' && num2 !== '' && num2 !== '-') {
            let result = operate(operator, num1, num2);
            screen.textContent = result;
            num1 = result.toString();
            num2 = '';
            operator = op;

            if(operator === '*') {
                screen.textContent += '×';
            } else if(operator === '/') {
                screen.textContent += '÷';
            } else {
                screen.textContent += operator;
            }
        }

        // if user add more than one operator before num2
        else if(operator !== '' && num2 === '') {
            // if user add minus before num2
            if((operator === '*' || operator == '/') && op === '-') {
                screen.textContent += '-'
                num2 += '-';
            } else {
                operator = op;

                if(operator === '*') {
                    screen.textContent = num1 + '×';
                } else if(operator === '/') {
                    screen.textContent = num1 + '÷';
                } else {
                    screen.textContent = num1 + operator;
                }
            }
                
        }
    }
}

function handleDecimal() {
    // dot '.' should only be displayed when there is number on the screen
    if(num1 !== '') {
        if(operator === '') { 
            // num1 doesn't have a dot sign '.'
            if(!num1.includes('.')) {
                num1 += '.';
                screen.textContent += '.';
            }
        } else {
            // num2 exists & num2 doesn't have a dot sign '.'
            if(num2 !== '' && !num2.includes('.'))
            num2 += '.';
            screen.textContent += '.';
        }
    }
}

function calculateResult() {
    // calculateResult should only be executed if num1, num2, and operator exist
    if(num1 !== '' && operator !== '' && num2 !== '') {
        let result = operate(operator, parseFloat(num1), parseFloat(num2));

        if(operator === '/' && num2 === '0') {  //divided by zero
            screen.textContent = 'Error';
            result = '';
        } else if(result.toString().includes('.')) {  //if the result is decimal
            if(isLongerThanTwoDecimals(result)) {
                result = result.toFixed(2);
            }
            screen.textContent = deleteLastZero(result);
        } else {  //if the result is integer
            screen.textContent = result;
        }

        num1 = result;
        num2 = '';
        operator = '';
    }
}

// check if there are more than two digits after the decimal point
function isLongerThanTwoDecimals(num) {
    // if number is decimal
    if(num.toString().includes('.')) {
        let numStr = num.toString();
        let parts= numStr.split('.');
        let behindComa = parts[1].split('');

        return behindComa.length > 2;
    }

    return false;
}

// deleteLastZero(0.10) -> 0.1
function deleteLastZero(num) {
    let numStr = num.toString().replace(/\.0+$/, '');
    let newNumber = Number(numStr);
    return newNumber;
}
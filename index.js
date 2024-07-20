// by Snowyfor
const keyboard = document.querySelector('#keyboard');
const screen = document.querySelector('#screen');
const operations = "+-/*%";

let num1 = '';
let num2 = '';
let operator = '';
screen.textContent = '';

keyboard.addEventListener('click', (e) => {
    let target = e.target;

    if (target.tagName === 'BUTTON') {
        console.log('Button clicked: ', target.id);  // Debugging line
        switch(target.id) {
            case 'clear':
                screen.textContent = '';
                num1 = '';
                num2 = '';
                operator = '';
                break;
            case 'del':
                screen.textContent = screen.textContent.slice(0, -1);
                if (operator === '') {
                    num1 = num1.slice(0, -1);
                } else {
                    num2 = num2.slice(0,-1);
                }
                break;
            case 'plus/minus':
                if (operator === '') {
                    num1 = (num1.charAt(0) === '-') ? num1.slice(1) : '-' + num1;
                    screen.textContent = num1;
                } else {
                    num2 = (num2.charAt(0) === '-') ? num2.slice(1) : '-' + num2;
                }
                break;
            case 'add':
            case 'sub':
            case 'mul':
            case 'div':
            case 'mod':
                if (num1 !== '' && operator === '') {
                    operator = target.textContent;
                    screen.textContent += operator;
                } else if (num1 !== '' && operator !== '' && num2 !== '') { // if user add mode than one operator
                    let result = operate(operator, parseFloat(num1), parseFloat(num2));
                    screen.textContent = result;
                    num1 = result.toString();
                    num2 = '';
                    operator = target.textContent;
                    screen.textContent += operator;
                }
                break;
            case 'equal':
                if (num1 !== '' && num2 !== '' && operator !== '') {
                    let result = operate(operator, parseFloat(num1), parseFloat(num2));
                    screen.textContent = result;
                    console.log(num1);
                    console.log(num2);
                    num1 = result;
                    num2 = '';
                    operator = '';
                }
                break;
            case 'coma':
                if (operator === '') {
                    if (!num1.includes('.')) {
                        screen.textContent += target.textContent;
                        num1 += target.textContent;
                    }
                } else {
                    if (!num2.includes('.')) {
                        screen.textContent += target.textContent;
                        num2 += target.textContent;
                    }
                }
                break;
            default:
                if (!isNaN(target.id)) {
                    screen.textContent += target.textContent;
                    if(operator === '') {
                        num1 += target.textContent;
                    } else {
                        num2 += target.textContent;
                    }
                }
                break;
        }
    }
});

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}
function mod(a, b) {
    return a % b;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return sub(num1, num2);
        case '×':
            return mul(num1, num2);
        case '÷':
            return div(num1, num2);
        case '%':
            return mod(num1, num2);
    }
}
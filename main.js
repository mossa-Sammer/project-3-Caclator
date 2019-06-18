//quering the dom
const calculator = document.querySelector('#calculator');
const screen = document.querySelector('#screen');
let equation = "";

const objOperator = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '.': '.'
}

//Calculator Listener
calculator.addEventListener('click', (e) => {

    // not above 18
    if (checkScreenLength()) {
        return;
    }

    // Numbers
    if (e.target.classList.contains('btn-digit')) {
        if (e.target.id == 'dot') {
            if (screen.textContent.endsWith('.')) {
                return;
            }

            let screenText = screen.textContent;
            for (let i = screenText.length - 1; i >= 0; --i) {
                if (!Number(screenText[i])) {
                    if (screenText[i] == '.') {
                        return;
                    }
                    else screen.textContent += '.';
                    return;
                }
            }
            screen.textContent += e.target.textContent;
        }
        //Numbers
        else {
            screen.textContent += e.target.textContent;
        }
    }

    // operators
    else if (e.target.classList.contains('btn-operator')) {
        operatorAction(e.target.textContent);
    }

    // clear the screen
    else if (e.target.id == 'clear') {
        screen.textContent = "";
    }

    // Delete one character at a time
    else if (e.target.id == 'del') {
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
    }

    //ُEvaluate the equation
    else if (e.target.id == 'equal') {
        evaluteScreen(e);
    }
});// end of the calcluator listener


// Key Listener
document.addEventListener("keydown", (e) => {
    if (checkScreenLength()) {
        return;
    }
    switch (e.key) {
        case '0': screen.textContent += "0";
            break;
        case '1': screen.textContent += "1";
            break;
        case '2': screen.textContent += "2";
            break;
        case '3': screen.textContent += "3";
            break;
        case '4': screen.textContent += "4";
            break;
        case '5': screen.textContent += "5";
            break;
        case '6': screen.textContent += "6";
            break;
        case '7': screen.textContent += "7";
            break;
        case '8': screen.textContent += "8";
            break;
        case '9': screen.textContent += "9";
            break;
        case '*': operatorAction('*');
            break;
        case '+': operatorAction('+');;
            break;
        case '-': operatorAction('-');
            break;
        case '/': operatorAction('/');
            break;
    }
});

function checkScreenLength() {
    return screen.textContent.length > 20;
}


function operatorAction(operator) {

    //you  can't type operator without number
    if (screen.textContent == "")
        return;

    let content = screen.textContent;

    if (objOperator[content[content.length - 1]]) {
        screen.textContent = (screen.textContent).slice(0, screen.textContent.length - 1);
        if (objOperator[content[content.length - 2]]) {
            screen.textContent = (screen.textContent).slice(0, screen.textContent.length - 2);
        }
    }

    //add the operator
    screen.textContent += operator;

}

function evaluteScreen(e) {
    //empty screen or operator not found
    if ((screen.textContent == "") || Number(screen.textContent)) {
        alert('enter valid expretion!');
        return;
    }

    //check if the last digit is an operator
    if (!Number(screen.textContent[screen.textContent.length - 1])) {
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
    }

    //evaluate the screen
    equation = eval(screen.textContent);

    if (!Number.isInteger(equation)) {
        equation = equation.toPrecision(8);
    }

    //You can't devide by zero
    if (equation == 'Infinity') {
        alert("Error,you can't divide by zero"); return;
    }
    //output the equation result in the screen
    screen.textContent = equation;
}
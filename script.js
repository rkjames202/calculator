/**
 * Calls corresponding operation function 
 * 
 * @param {number} x Left operand
 * @param {number} y Right operand
 * @param {character} operator Operation being performed
 * @returns Void
 */
function operate(x, y, operator){
    let result;
    switch (operator){
        case '+': 
            result = add(x,y);
            break;
        case '-':
            result = subtract(x,y); 
            break;
        case '*':
            result = multiply(x,y);
            break;
        case '/':
            result = divide(x, y);
            break;
        default:
            //Invalid operator
            break;
    }

    return result;
}

/**
 * Adds two numbers
 * 
 * @param {string} x Left operand  
 * @param {string} y Right operand
 * @returns Result of expression
 */
function add(x, y){
    return +x + +y;
}

/**
 * Subtracts two numbers
 * 
 * @param {string} x Left operand 
 * @param {string} y Right operand
 * @returns Result of expression
 */
function subtract(x, y){
    return +x - +y;
}

/**
 * Multiplies two numbers
 * 
 * @param {string} x Left operand  
 * @param {string} y Right operand
 * @returns Result of expression
 */
function multiply(x, y){
    return +x * +y;
}

/**
 * Divides two numbers
 * 
 * @param {string} x Left operand  
 * @param {string} y Right operand
 * @returns Result of expression
 */
function divide(x, y){
    return +x / +y;
}

/**
 * Adds events listeners to all buttons
 */
function addButtonListeners(){
    addNumberListeners();
    addMutatorListeners();
    addOperationListeners();
}

/**
 * Adds event listeners to number buttons
 */
function addNumberListeners(){
    const numbers = document.querySelectorAll('.numbers button');
    numbers.forEach((number) => number.addEventListener('click', populateDisplay));
    numbers.forEach((number) => number.addEventListener('click', appendExpression));
}
/**
 * Adds event listeners to mutator buttons
 */
 function addMutatorListeners(){
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearDisplay);
}

/**
 * Adds event listeners to operation buttons and
 * equals button
 */
function addOperationListeners(){
    const operations = document.querySelectorAll('.operations button');
    operations.forEach((operation) => operation.addEventListener('click', appendExpression));
    operations.forEach((operation) => operation.addEventListener('click', activateOperator));

    const equalsButton = document.querySelector('.equals-button')
    equalsButton.addEventListener('click', evaluateExpression);
}


/**
 * Callback function
 * Populates display with number clicked
 */
function populateDisplay(){
    const display = document.querySelector('.display');

    //If display has placeholder value, add number clicked to display and expression
    if(display.innerText === '0'|| isOperatorActive()){
        display.innerText = this.innerText;
    //No more than 10 characters in display at once
    } else if (display.innerText.length < 10){
        display.innerText += this.innerText;
    }
  
}

/**
 * Clears display
 */
function clearDisplay(){
    const display = document.querySelector('.display');
    display.innerText = 0;

    //Clear existing expression too
    const expression = document.querySelector('.expression');
    expression.innerText = '';

    //Deactivate current operator
    if(isOperatorActive()){
        deactivateOperator();
    }
}



/**
 * Stores the expression on webpage
 */
 function appendExpression(){
    const expression = document.querySelector('.expression');

    expression.innerText += this.innerText;
}

/**
 * Evaluates the current expression
 */
function evaluateExpression(){
    const display = document.querySelector('.display');
    const expression = document.querySelector('.expression');
    
    let operands; //Store left and right operands
    let result; //Store result of expression

    //Test for the operator inside of expression
    if(expression.innerText.includes('+')){
        
        operands = expression.innerText.split('+');
        result = operate(operands[0], operands[1], '+');
        
    } else if(expression.innerText.includes('-')){
        
        operands = expression.innerText.split('-');
        result = operate(operands[0], operands[1], '-');
    
    }else if(expression.innerText.includes('*')){
        
        operands = expression.innerText.split('*');
        result = operate(operands[0], operands[1], '*');
    
    } else if(expression.innerText.includes('/')){

        operands = expression.innerText.split('/');
        result = operate(operands[0], operands[1], '/');

    }

    //Add expression to display and expression string
    display.innerText = result;
    expression.innerText = result;

    deactivateOperator();
}

/**
 * Callback function
 * 
 * Lets program know what operator is active
 */
function activateOperator(){
 const operations = document.querySelectorAll('.operations button');

    //If another operator is already active, deactivate
    operations.forEach((operator) =>{
        if(operator.classList.contains('active-operator')){
            operator.classList.remove('active-operator');
        }
    });

    //Activate current operator
    this.classList.add('active-operator');
}

/**
 * Lets program know if user has clicked an
 * operator button
 * 
 * @returns if operator is active or not
 */
function isOperatorActive(){
    const operations = document.querySelectorAll('.operations button');
    let operatorActive = false;

    operations.forEach((operator) =>{
        if(operator.classList.contains('active-operator')){
            operatorActive = true;
        }
    });

    return operatorActive;
}

/**
 * Deactivates active operator button
 */
function deactivateOperator(){
    const operations = document.querySelectorAll('.operations button');
    
    operations.forEach((operator) =>{
        if(operator.classList.contains('active-operator')){
            operator.classList.remove('active-operator');
        }
    });
}


//Make function to get nodelist/node of selector?

addButtonListeners();

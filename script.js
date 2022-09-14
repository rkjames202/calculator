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
 * @param {number} x Left operand  
 * @param {number} y Right operand
 * @returns Result of expression
 */
function add(x, y){
    return x + y;
}

/**
 * Subtracts two numbers
 * 
 * @param {number} x Left operand  
 * @param {number} y Right operand
 * @returns Result of expression
 */
function subtract(x, y){
    return x - y;
}

/**
 * Multiplies two numbers
 * 
 * @param {number} x Left operand  
 * @param {number} y Right operand
 * @returns Result of expression
 */
function multiply(x, y){
    return x * y;
}

/**
 * Divides two numbers
 * 
 * @param {number} x Left operand  
 * @param {number} y Right operand
 * @returns Result of expression
 */
function divide(x, y){
    return x/y;
}

/**
 * Adds events listeners to all buttons
 */
function addButtonListeners(){
    addNumberListeners();
    addMutatorListeners()
}

/**
 * Adds event listeners to number buttons
 */
function addNumberListeners(){
    const numbers = document.querySelectorAll('.numbers button');
    numbers.forEach((number) => number.addEventListener('click', populateDisplay));
}

/**
 * Callback function
 * Populates display with number clicked
 */
function populateDisplay(){
    const display = document.querySelector('.display');

    //If display has placeholder value, add number clicked 
    if(display.innerText === '0'){
        display.innerText = this.innerText;
    //No more than 10 characters in display at once
    } else if (display.innerText.length < 10){
        display.innerText += this.innerText;
    }
    
}

/**
 * Adds event listeners to mutator buttons
 */
function addMutatorListeners(){
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearDisplay);
}

/**
 * Clears display
 */
function clearDisplay(){
    const display = document.querySelector('.display');
    display.innerText = 0;
}

addButtonListeners();

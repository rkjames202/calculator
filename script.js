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
    if (x == 0 || y == 0){return "Can't / By 0!"}
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
    let expression = document.querySelector('.expression').innerText;
    let operators= ['+', '-', '*', '/'];

    //Test for decimal input first, appendExpression()

    //If input is a decimal
    if(this.innerText == '.'){
        //If there isn't a decimal in current number and an operator hasn't been clicked
        if(!display.innerText.includes('.') && !operators.includes(expression.slice(-1))){
            display.innerText += this.innerText;
            return;
        }else if (isOperatorActive() && operators.includes(expression.slice(-1))){
            display.innerText = 0 + this.innerText;
        }
    }

    //If input is not decimal
    if(this.innerText != '.'){
        //If display has placeholder value, operator button was clicked and there is an unfinished expression
        if(display.innerText === '0' || (isOperatorActive() && operators.includes(expression.slice(-1)))){
            display.innerText = this.innerText;
        //No more than 10 characters in display at once
        }else if (display.innerText.length < 10){
            display.innerText += this.innerText;
        }
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
    expression.innerText = 0;

    //Deactivate current operator
    if(isOperatorActive()){
        deactivateOperator();
    }
}



/**
 * Stores the expression on webpage
 */
 function appendExpression(){
    let expression = document.querySelector('.expression');
    const display = document.querySelector('.display');
    
    let operators = ['+', '-', '*', '/'];
    let trailingOperator;
    let result;

    //Appends most recent user input to expression
    expression.innerText += this.innerText;

    findDecimalInExpression();

    //Tests if there is an expression that can be solved before most recent operator
   outer: for(let i = 0; i < operators.length ; i++){
        let operator = operators[i];
        
        //If there is an operator in the expression and there is a trailing operator
        if(expression.innerText.includes(operator) && 
           operators.includes(expression.innerText[expression.innerText.length -1])){
           
           trailingOperator = expression.innerText.slice(-1); //get trailing operator
           
           //If there is no trailing operator, break loop
           if(!trailingOperator) break outer;

           let testExpression = expression.innerText.slice(0, -1); //get expression before

            let operands = testExpression.split(operator);
            
            //If there is a left and right operand
            if(operands.length == 2 && operands[1] != '' && operands[0] != ''){  
                result = operate(operands[0], operands[1], operator);
                break outer;
            
            //Put this into helper function
            //If there is a number followed by two trailing operators (ex. 4++)
            } else if((operators.includes(expression.innerText[expression.innerText.length -1]) &&
                        operators.includes(expression.innerText[expression.innerText.length - 2]))){
                let number;          
                //Search expression for first occurrence of operator
                for(let n = 0; n < expression.innerText.length; n++){       
                    //Get number and use expression found
                    if(operators.includes(expression.innerText[n])){
                         number = expression.innerText.split(expression.innerText[n], 1);
                         //Use the number as both left and right operand and perform operation  
                         result = operate(number, number, expression.innerText[n]);  
                        break outer;   
                    }
                }               
            }
        }
    }

   //If there was an expression to be evaluated...
   if(result != undefined){
        display.innerText = result; //display the result
        expression.innerText = result + trailingOperator; //append the trailing operator to expression
   }

 }

 function findDecimalInExpression(){
    const expression = document.querySelector('.expression');
    let operators = ['+', '-', '*', '/'];
    let operand;

    if(expression.innerText.includes('.')){
        //Look for operator in expression first
        for(let i = 0; i < expression.innerText.length; i++){
            if(operators.includes(expression.innerText[i])){
                //Get the right operand
                operand = expression.innerText.split(expression.innerText[i])[1];
                break;
            } else {
                //No operator? Use the current number
                operand = expression.innerText;
            }
        }

        //If number has more than one decimal, remove it
        if(operand.slice('-1').includes('.') && operand.slice(0, -1).includes('.')){
            expression.innerText = expression.innerText.slice(0, -1);
        }
    }
 }

/**
 * Callback function
 * 
 * Evaluates the current expression
 */
function evaluateExpression(){
    const display = document.querySelector('.display');
    const expression = document.querySelector('.expression');
    let operators= ['+', '-', '*', '/'];

    let operands; //Store left and right operands
    let result; //Store result of expression

    //Test for the operator inside of expression
    for(let i = 0; i < expression.innerText.length; i++){
        //Finds the first occurrence of operator in expression
        if(operators.includes(expression.innerText[i])){
            operands = expression.innerText.split(expression.innerText[i]);
            result = operate(operands[0], operands[1], expression.innerText[i]);
        } 
        
    }
    
    //If an invalid expression is entered don't change display 
    if(result === undefined && result != 0){
        result = display.innerText;
    }

    //Add expression to display and expression string
    display.innerText = result;

    expression.innerText = result;

    deactivateOperator();

    //When a number button is clicked after evaluating, reset display
    const numbers = document.querySelectorAll('.numbers button');
    numbers.forEach((number) => number.addEventListener('click', resetDisplay));
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

/**
 * Callback function
 * 
 * Click a button resets display and expression 
 * stored after equals button is click
 */
function resetDisplay(){
    //Get numbers buttons reference
    const display = document.querySelector('.display');
    const expression = document.querySelector('.expression');
    const numbers = document.querySelectorAll('.numbers button');

    
    //If user wants to perform another operations, don't reset display
    if(this.innerText == '.' && !isOperatorActive()){
        //Append 0 in front of decimal if clicked
        display.innerText = 0 + this.innerText;
        expression.innerText = 0 + this.innerText;
         
        //After event is fired, remove the event listeners
        numbers.forEach((number) => number.removeEventListener('click', resetDisplay));

    }else if(!isOperatorActive()){    
        display.innerText = this.innerText;
        expression.innerText = this.innerText;
     
        numbers.forEach((number) => number.removeEventListener('click', resetDisplay));
    } 
}

//commit
//Format long decimal numbers (to 3 or 4 decimal points)
//If number gets too long, display NaN
//Try to break the calculator some more

addButtonListeners();

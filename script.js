class Calculator{
    constructor(currentOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return  //if the user enters the period and it already has a period, then return.
        this.currentOperand = this.currentOperand.toString() + number.toString();
        
    }
    chooseOperation(operation){
        if(this.currentOperand === '' || this.currentOperand === '.') return  //avoids pressing operations before pressing a number or decimal.
        //console.log('current operand ' + typeOf(this.currentOperand))

        console.log('before if: ' + this.currentOperand.typeOf)
        if(this.currentOperand.charAt(this.currentOperand.length-1) == '+' ||this.currentOperand.charAt(this.currentOperand.length-1) == '_'
        ||this.currentOperand.charAt(this.currentOperand.length-1) == '*' ||this.currentOperand.charAt(this.currentOperand.length-1) == '/'
        ||this.currentOperand.charAt(this.currentOperand.length-1) == '%') return  //avoids duplicate operations
        console.log('after if: ' + this.currentOperand.typeOf)

        this.operation = operation //sets the operation from the listener to the calculator
        this.currentOperand = `${this.currentOperand}${this.operation}` //empty the current operand so that you can put more numbers and operations in
        console.log('after if: ' + this.currentOperand.typeOf)
    }
    compute(){
        console.log(this.currentOperand.length)
        let numbersArray = [];
        let operationsArray = [];
        
        
        numbersArray = this.currentOperand.split(/[+,_,/,*,%]/).map(Number);  //changes string to number array.
        console.log(numbersArray)

        for(let i = 0; i<this.currentOperand.length;i++){
            if(this.currentOperand[i] == '+'||this.currentOperand[i] == '_'
            ||this.currentOperand[i] == '/'||this.currentOperand[i] == '*'
            ||this.currentOperand[i] == '%'){
                operationsArray.push(this.currentOperand[i]);
            }

            
        }
        console.log(operationsArray);

        let computation = numbersArray[0]  //initial value is the first value of numbers.
        let temp = 0;

        for(let i = 1; i < numbersArray.length;i++){
            switch(operationsArray[temp]){
                case('+'):
                    computation = computation + parseFloat(numbersArray[i]);
                    temp++;
                    break;
                case('_'):
                    computation = computation - parseFloat(numbersArray[i]);
                    temp++
                    break;
                case('*'):
                    computation = computation * parseFloat(numbersArray[i]);
                    temp++
                    break;
                case('/'):
                    computation = computation / parseFloat(numbersArray[i]);
                    temp++
                    break;
                case('%'):
                    computation = computation % parseFloat(numbersArray[i]);
                    temp++
                    break;
            }

        }
        this.currentOperand = computation



    }

    getDisplayNumber(number) {  

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        


    }
}

//using const to avoid the variable value and type from being changed.
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText); //inputs string from number buttons 0-9 and .
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);//inputs string from the operation buttons.
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()

})

allClearButton.addEventListener('click', button => {
    calculator.clear() //resets previous and current operand to be empty strings. operation becomes 'undefined'
    calculator.updateDisplay()

})

deleteButton.addEventListener('click', button => {
    calculator.delete() //currentOperand loses the last character of the string.
    calculator.updateDisplay()

})
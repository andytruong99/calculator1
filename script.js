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
        this.operation = operation //sets the operation from the listener to the calculator
    
    }
    compute(){
        let computation
        
        const current = parseFloat(this.currentOperand)
        
        
        if(isNaN(current)) return  //checks to see if there is a previousOperand and currentOperand to compute. returns undefined if I press = without any numbers.
        
        switch (this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return
        }
        this.currentOperand = computation //changes currentOperand to equal the computation from above switch statement.
        this.operation = undefined //resets the operation so it can accept another one.
        
    }

    getDisplayNumber(number) {  
        console.log("number ", number)
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])  //integer value of the decimal. 12.1-- integerDigits = 12
        const decimalDigits = stringNumber.split('.')[1] // float value of the decimal. 12.1-- decimalDigits = 1
        let integerDisplay
        console.log("integerdigits= ", integerDigits, " stringnumber= ", stringNumber );
        if (isNaN(integerDigits)) {  //if integerDigits is 'Not a Number'
          integerDisplay = ''  //if 0th split of stringNumber is not a number then user pressed the decimal. this means that I can assume that there are no numbers before the decimal.
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) //so it looks like 1000 becomes 1,000 in the display.
          console.log("integerdisplay= ", integerDisplay );
        }
        if (decimalDigits != null) {  //if the decimal do exist from the [1] of the stringNumber split,
          return `${integerDisplay}.${decimalDigits}` //then return the integerDisplay and the decimal digits present in stringNumber[1]
        } else {
            console.log("integerdisplay= ", integerDisplay );
          return integerDisplay //this says if there are no decimal digits, then it is an integer. We can just return whatever was inside the previous if else statement.
        }
      }

    updateDisplay(){
        //console.log("this.co= ", this.currentOperand);
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)  //.innerText changes the value inside the html data-current-operand to whatever is inside the currentOperand. That is why it shows inside the display.
        //currentOperandTextElement = integerDisplay from getDisplayNumber

        console.log("this.operation= ", this.operation, "this.cote= ", this.currentOperandTextElement.innerText)
        if(this.operation != null ){
            //let temp = this.currentOperand;
            console.log("operation=cote= ", this.currentOperandTextElement.innerText, " currentExp= ", currentExp, " operation= ", this.operation)
            this.currentOperandTextElement.innerText = `${currentExp} ${this.operation} ${this.currentOperandTextElement.innerText}`
            this.currentOperand = ""
        } else if (this.currentOperandTextElement.innerText === "" && (this.operation == null)) {
            console.log("cote===blank= ", this.currentOperandTextElement.innerText, " currentExp= ", currentExp)
            this.currentOperandTextElement.innerText = `${this.currentOperandTextElement.innerText}${this.currentOperand}`
            currentExp = this.currentOperandTextElement.innerText
        } else if (currentExp === "" && (this.operation == undefined || this.operation == null)) {
            console.log("cote!==blank= ", this.currentOperandTextElement.innerText, " currentExp= ", currentExp)
            this.currentOperandTextElement.innerText = `${currentExp}${this.currentOperand}`
            currentExp = this.currentOperandTextElement.innerText
        } else if (currentExp !== "" && (this.operation == null)) {
            console.log("cote!==blank= ", this.currentOperandTextElement.innerText, " currentExp= ", currentExp)
            this.currentOperandTextElement.innerText = `${currentExp}${this.currentOperand}`
            currentExp = this.currentOperandTextElement.innerText
        } 

        //this.previousOperandTextElement.innerText changed value inside the data-previous-operand to previousOperand + operation.

        //updateDisplay is just changing the display text.. no calculations are actually being made in this method.

    }
}

//using const to avoid the variable value and type from being changed.
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

var currentExp = "";

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
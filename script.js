let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')



let add = (a, b) => a + b;

let subtract = (a, b) => a - b;

let multiply = (a, b) => a * b;

let divide = (a, b) => a / b;

let first_number = 0;
let second_number = 0;
let operator = '';

function operate(first_number, second_number, operator){
    first_number = Number(first_number)
    second_number = Number(second_number)
    if(operator == "+"){
        return add(first_number, second_number);
    }
    else if(operator == "-"){
        return subtract(first_number, second_number);
    }
    else if(operator == "*"){
        return multiply(first_number, second_number);
    }
    else if(operator =="/"){
        return divide(first_number, second_number);
    }
    else {
        return null;
    }
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '/' && currentOperationScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
  }
  

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

deleteButton.addEventListener('click', deleteNumber)
clearButton.addEventListener('click', clear)
pointButton.addEventListener('click', appendPoint)
equalsButton.addEventListener('click', evaluate)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
      resetScreen()
    currentOperationScreen.textContent += number
  }

  function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
  }

  function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
  }

  operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)


function clear() {
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
  }
  
  function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
      currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
  }

  function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent
      .toString()
      .slice(0, -1)
  }
  
  function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return subtract(a, b)
      case '*':
        return multiply(a, b)
      case '/':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
  }
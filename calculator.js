// Simple calculator JavaScript code

// Variables to store our calculator's state
let currentNumber = '0';  // The number currently being typed
let previousNumber = '';  // The previous number for calculations
let operator = '';        // The math operation (+, -, *, /)

// Get the display elements from HTML
const currentDisplay = document.getElementById('currentNumber');
const previousDisplay = document.getElementById('previousNumber');

// Function to add a number when user clicks a number button
function addNumber(number) {
    // If current number is 0, replace it with the new number
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        // Otherwise, add the new number to the end
        currentNumber = currentNumber + number;
    }
    updateDisplay();
}

// Function to add a decimal point
function addDecimal() {
    // Only add decimal if there isn't one already
    if (currentNumber.indexOf('.') === -1) {
        currentNumber = currentNumber + '.';
        updateDisplay();
    }
}

// Function when user clicks an operation button (+, -, *, /)
function chooseOperation(selectedOperator) {
    // If we already have numbers and an operator, calculate first
    if (previousNumber !== '' && currentNumber !== '' && operator !== '') {
        calculate();
    }
    
    // Store the current number as previous number
    previousNumber = currentNumber;
    // Store which operation was clicked
    operator = selectedOperator;
    // Reset current number for next input
    currentNumber = '0';
    
    updateDisplay();
}

// Function to do the math calculation
function calculate() {
    let result;
    
    // Convert text to actual numbers
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    
    // Check if we have valid numbers
    if (isNaN(prev) || isNaN(current)) return;
    
    // Do the math based on which operator was used
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Don't divide by zero!
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Update our variables with the result
    currentNumber = result.toString();
    operator = '';
    previousNumber = '';
    
    updateDisplay();
}

// Function to clear everything
function clearAll() {
    currentNumber = '0';
    previousNumber = '';
    operator = '';
    updateDisplay();
}

// Function to update what's shown on the screen
function updateDisplay() {
    // Show current number on bottom line
    currentDisplay.textContent = currentNumber;
    
    // Show previous number and operator on top line
    if (previousNumber !== '' && operator !== '') {
        previousDisplay.textContent = previousNumber + ' ' + operator;
    } else {
        previousDisplay.textContent = '';
    }
}

// Add keyboard support so people can type numbers
document.addEventListener('keydown', function(event) {
    // If user types a number
    if (event.key >= '0' && event.key <= '9') {
        addNumber(event.key);
    }
    
    // If user types operators
    if (event.key === '+') chooseOperation('+');
    if (event.key === '-') chooseOperation('-');
    if (event.key === '*') chooseOperation('*');
    if (event.key === '/') {
        event.preventDefault(); // Stop browser from opening search
        chooseOperation('/');
    }
    
    // If user types decimal point
    if (event.key === '.') addDecimal();
    
    // If user presses Enter or equals
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // If user presses Escape or 'c' for clear
    if (event.key === 'Escape' || event.key.toLowerCase() === 'c') {
        clearAll();
    }
});


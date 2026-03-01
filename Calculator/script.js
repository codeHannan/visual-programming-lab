const display = document.getElementById('display');
let currentInput = '0';
let shouldReset = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendToDisplay(value) {
  if (shouldReset && !isNaN(value)) {
    currentInput = '';
    shouldReset = false;
  }

  if (currentInput === '0' && value !== '.' && !isNaN(value)) {
    currentInput = value;
  } else {
    currentInput += value;
  }

  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  shouldReset = false;
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '0') {
    if (currentInput.startsWith('-')) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = '-' + currentInput;
    }
    updateDisplay();
  }
}

function calculate() {
  try {
    let expression = currentInput.replace(/%/g, '/100');
    let result = eval(expression);

    if (!isFinite(result)) {
      currentInput = 'Error';
      shouldReset = true;
    } else {
      currentInput = parseFloat(result.toFixed(10)).toString();
      shouldReset = true;
    }
  } catch {
    currentInput = 'Error';
    shouldReset = true;
  }

  updateDisplay();
}
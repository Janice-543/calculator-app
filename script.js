let display = document.getElementById('display');
let currentInput = '0';
let memoryValue = 0;  // 新增記憶變數
let shouldResetDisplay = false; // 用來控制輸入新數字時是否重置畫面

function updateDisplay() {
    display.textContent = currentInput;
}

// 點擊數字或小數點
function appendToDisplay(value) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1500);
    }
}

// --- 記憶功能函數 ---

function memoryAdd() {
    try {
        let currentValue = eval(currentInput);
        memoryValue += currentValue;
        console.log('Memory:', memoryValue);
        showMemoryIndicator();
        shouldResetDisplay = true; // 記住後，下一次按數字會重置畫面
    } catch (error) {
        console.error('Memory add error:', error);
    }
}

function memorySubtract() {
    try {
        let currentValue = eval(currentInput);
        memoryValue -= currentValue;
        console.log('Memory:', memoryValue);
        showMemoryIndicator();
        shouldResetDisplay = true; // 記住後，下一次按數字會重置畫面
    } catch (error) {
        console.error('Memory subtract error:', error);
    }
}

function memoryRecall() {
    currentInput = memoryValue.toString();
    updateDisplay();
    shouldResetDisplay = true;
}

function memoryClear() {
    memoryValue = 0;
    console.log('Memory cleared');
    hideMemoryIndicator();
    shouldResetDisplay = true;
}

// 顯示或隱藏記憶指示器
function showMemoryIndicator() {
    display.style.borderLeft = '5px solid #ff9800';
}

function hideMemoryIndicator() {
    display.style.borderLeft = 'none';
}
// 新增科學計算函數（下拉選單版本）
function applyScientificOp() {
    let select = document.getElementById('scientificOp');
    let operation = select.value;
    
    if (!operation) return;
    
    try {
        let value = eval(currentInput);
        let result;
        
        switch(operation) {
            case 'sin':
                result = Math.sin(value * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(value * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(value * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(value);
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                break;
            case 'pow':
                result = Math.pow(value, 2);
                break;
            default:
                result = value;
        }
        
        currentInput = result.toString();
        updateDisplay();
        
        // 重置選單
        select.value = '';
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(() => {
            currentInput = '0';
            updateDisplay();
        }, 1500);
    }
}
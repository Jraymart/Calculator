const resultText = document.querySelector("#result-text");
        let currentInput = "";
        let operator = null;
        let previousInput = "";
        let resetScreen = false;

        //when a number is pressed and no operator is selected append number
        //when an operator is pressed append to result but prevent replace if another operator is pressed
        // 1 set of number inputs then operator then 2nd set of number inputs
        // C clears the screen. %automatically divides the number input by 100, +/- turns the number into a negative or positive

        //listeners for button presses
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                if (button.textContent >= "0" && button.textContent <= "9") {
                    appendNum(button.textContent);

                }
                else if (button.textContent === "C") { clear(); }
                else if (button.textContent === "=") { calculate(); }
                else if (button.textContent === "%") { calculatePercent(); }
                else if (button.textContent === "+/-") { changeSign(); }
                else if (button.textContent === ".") { appendDecimal(); }
                else { setOperator(button.textContent); }
            });
        });

        //function to handle the calculations
        function calculate() {
            let result;
            const previous = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            switch (operator) {
                case "+":
                    result = previous + current;
                    break;
                case "-":
                    result = previous - current;
                    break;
                case "÷":
                    result = current === 0 ? "ERROR!" : previous / current;
                    break;
                case "x":
                    result = previous * current;
                    break;
                default:
                    return;
            }

            currentInput = result.toString();
            operator = null;
            previousInput = "";
            updateScreen();
        }

        //function that handles decimal points
        function appendDecimal() {
            if (resetScreen) resetDisplay();
            if (!currentInput.includes(".")) {
                currentInput += ".";
                updateScreen();
            }
        }

        //function that handles sign changes
        function changeSign() {
            currentInput = (parseFloat(currentInput * -1)).toString();
            updateScreen();
        }

        //function that handles percent calculations
        function calculatePercent() {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateScreen();
        }

        //function to handle setting operators
        function setOperator(op) {
            if (operator != null) calculate();
            previousInput = currentInput;
            operator = op;
            resetScreen = true;
        }

        //function that clears all inputs
        function clear() {
            currentInput = "";
            operator = null;
            previousInput = "";
            resultText.textContent = "0";
        }
        //function that resets the display before entering a new number
        function resetDisplay() {
            currentInput = ""
            resetScreen = false;
        }

        //function that handles number buttons
        function appendNum(num) {
            if (resetScreen) resetDisplay();
            if (currentInput === "0" && num !== ".") {
                currentInput = num
            } else { currentInput += num; }
            updateScreen();
        }
        //function that updates the screen
        function updateScreen() {
            return resultText.textContent = currentInput;
        }
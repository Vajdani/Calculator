var isOn = false

var maximized = false
var posBeforeMax = {
    "top" : 0,
    "left" : 0,
}

var minimized = false

var lastAction
var num = "0"
var numCache = "0"

var numLengthLimit = 12

var opToChar = {
    "div": " / ",
    "mul": " * ",
    "sub": " - ",
    "add": " + ",
}

var codeToAction = {
    "Backspace": "ce",
    "Delete": "c",
    "NumpadDivide": "div",
    "NumpadMultiply": "mul",
    "NumpadSubtract": "sub",
    "NumpadAdd": "add",
    "NumpadEnter": "ent",
    "Enter": "ent",
    "NumpadDecimal": "dec"
}

var codeToNum = {
    "Backquote": 0,
    "Digit1": 1,
    "Digit2": 2,
    "Digit3": 3,
    "Digit4": 4,
    "Digit5": 5,
    "Digit6": 6,
    "Digit7": 7,
    "Digit8": 8,
    "Digit9": 9,
    "Numpad0": 0,
    "Numpad1": 1,
    "Numpad2": 2,
    "Numpad3": 3,
    "Numpad4": 4,
    "Numpad5": 5,
    "Numpad6": 6,
    "Numpad7": 7,
    "Numpad8": 8,
    "Numpad9": 9,
}

function Toggle() {
    isOn = !isOn
    document.getElementById("calc").style.display = isOn ? "flex" : "none"
}

function maximize() {
    maximized = !maximized

    let calc = document.getElementById("calc")
    if (maximized) {
        calc.className = "CalcContainer-maximized"
        posBeforeMax.top = calc.style.top
        posBeforeMax.left = calc.style.left
        calc.style.top = 0
        calc.style.left = 0

        document.getElementById("calc-inner").className = "Calculator-maximized"
        document.getElementById("calcheader").className = "CalculatorTopBar-maximized"
    }
    else {
        calc.className = "CalcContainer"
        calc.style.top = posBeforeMax.top
        calc.style.left = posBeforeMax.left

        document.getElementById("calc-inner").className = "Calculator"
        document.getElementById("calcheader").className = "CalculatorTopBar"
    }
}

window.addEventListener("keydown", (e) => {
    let action = codeToAction[e.code]
    if (action != null) {
        OnInput(action)
        return
    }

    let numKey = codeToNum[e.code]
    if (numKey != null) {
        OnInput(numKey)
    }
})

function UpdateOutput() {
    document.getElementById("outputUpper").innerText = (numCache != "0" ? numCache + opToChar[lastAction] : "⠀")
    document.getElementById("outputLower").innerText = num.substring(0, num.includes(".") ? numLengthLimit + 1 : numLengthLimit)
}

function Calculate() {
    if (lastAction != null) {
        switch (lastAction) {
            case "div":
                num = (parseFloat(numCache) / parseFloat(num)).toString()
                break;
            case "mul":
                num = (parseFloat(numCache) * parseFloat(num)).toString()
                break;
            case "sub":
                num = (parseFloat(numCache) - parseFloat(num)).toString()
                break;
            case "add":
                num = (parseFloat(numCache) + parseFloat(num)).toString()
                break;
            default:
                break;
        }

        numCache = "0"
        lastAction = null
        UpdateOutput()

        return
    }
}

function OnInput(button) {
    if (typeof (button) == "string") {
        switch (button) {
            case "c":
                num = "0"
                numCache = "0"
                lastAction = null
                break;
            case "ce":
                num = "0"
                break;
            case "ent":
                Calculate()
                break;
            case "inv":
                num = (parseFloat(num) * -1).toString()
                break;
            case "pow":
                num = Math.pow(parseFloat(num), 2).toString()
                break;
            case "dec":
                if (num.includes(".")) { break }
                num = num + "."
                break;
            default:
                if (lastAction != null) {
                    Calculate()
                }

                lastAction = button
                numCache = num
                //num = "0"
                break;
        }
    }
    else if ((num.includes(".") ? num.length - 1 : num.length) < numLengthLimit) {
        if (num == "0") {
            num = button.toString()
        }
        else {
            num += button
        }
    }

    UpdateOutput()
}


//#region Window dragging https://www.w3schools.com/howto/howto_js_draggable.asp
// Make the DIV element draggable:
dragElement(document.getElementById("calc"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        if (maximized) { return }

        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
//#endregion
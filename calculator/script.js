var isOn = false
var lastAction
var num = "0"
var numCache = "0"

var numLengthLimit = 12

var opToChar = {
    "div" : " / ",
    "mul" : " * ",
    "sub" : " - ",
    "add" : " + ",
}

var codeToAction = {
    "Backspace"      : "ce",
    "Delete"         : "c",
    "NumpadDivide"   : "div",
    "NumpadMultiply" : "mul",
    "NumpadSubtract" : "sub",
    "NumpadAdd"      : "add",
    "NumpadEnter"    : "ent",
    "Enter"          : "ent",
    "NumpadDecimal"  : "dec"
}

var codeToNum = {
    "Backquote"    : 0,
    "Digit1"    : 1,
    "Digit2"    : 2,
    "Digit3"    : 3,
    "Digit4"    : 4,
    "Digit5"    : 5,
    "Digit6"    : 6,
    "Digit7"    : 7,
    "Digit8"    : 8,
    "Digit9"    : 9,
    "Numpad0"   : 0,
    "Numpad1"   : 1,
    "Numpad2"   : 2,
    "Numpad3"   : 3,
    "Numpad4"   : 4,
    "Numpad5"   : 5,
    "Numpad6"   : 6,
    "Numpad7"   : 7,
    "Numpad8"   : 8,
    "Numpad9"   : 9,
}

function Toggle() {
    isOn = !isOn
    document.getElementById("calc").style.display = isOn ? "flex" : "none"
}

function maximize() {
    window.alert("ball")
}

window.addEventListener("keydown", (e) => {
    console.log(e.code)
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
    if (typeof(button) == "string") {
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
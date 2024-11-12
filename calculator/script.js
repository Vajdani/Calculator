var isOn = false
var lastAction
var num = 0
var numCache = 0
var numStr = ""
function Toggle() {
    isOn = !isOn
    document.getElementById("calc").style.display = isOn ? "flex" : "none"
}

function maximize() {
    window.alert("ball")
}

window.addEventListener("keydown", (e) => { if (e.code == "Backspace")          { OnInput("ce") } })
window.addEventListener("keydown", (e) => { if (e.code == "Delete")             { OnInput("c") } })
window.addEventListener("keydown", (e) => { if (e.code == "NumpadDivide")       { OnInput("div") } })
window.addEventListener("keydown", (e) => { if (e.code == "NumpadMultiply")     { OnInput("mul") } })
window.addEventListener("keydown", (e) => { if (e.code == "NumpadSubtract")     { OnInput("sub") } })
window.addEventListener("keydown", (e) => { if (e.code == "NumpadAdd")          { OnInput("add") } })
window.addEventListener("keydown", (e) => { if (e.code == "NumpadEnter")        { OnInput("ent") } })
window.addEventListener("keydown", (e) => { if (e.code == "NumpadDecimal")      { OnInput("dec") } })

window.addEventListener("keydown", (e) => { if (e.code == "Numpad0")            { OnInput(0) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad1")            { OnInput(1) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad2")            { OnInput(2) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad3")            { OnInput(3) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad4")            { OnInput(4) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad5")            { OnInput(5) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad6")            { OnInput(6) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad7")            { OnInput(7) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad8")            { OnInput(8) } })
window.addEventListener("keydown", (e) => { if (e.code == "Numpad9")            { OnInput(9) } })


function UpdateOutput() {
    document.getElementById("outputUpper").innerText = (numCache != 0 ? toString(numCache) + lastAction : "⠀")
    document.getElementById("outputLower").innerText = num
}

function OnInput(button) {
    if (typeof(button) == "string") {
        switch (key) {
            case "c":
                num = 0
                numCache = 0
                lastAction = null
                UpdateOutput()
                break;
            case "ce":
                num = 0
                UpdateOutput()
                break;
            case "ent":
                UpdateOutput()
                break;
            default:
                lastAction = button
                break;
        }

        return
    }

    if (lastAction != null) {
        switch (lastAction) {
            case "div":
                num = num / numCache
                numCache = 0
                UpdateOutput()
                break;
            case "mul":
                num = num * numCache
                numCache = 0
                UpdateOutput()
                break;
            case "sub":
                num = num - numCache
                numCache = 0
                UpdateOutput()
                break;
            case "add":
                num = num + numCache
                numCache = 0
                UpdateOutput()
                break;
            case "sqrt":
                num = num ^ numCache
                numCache = 0
                UpdateOutput()
                break;
            case "inv":
                num = -num
                UpdateOutput()
                break;
            default:
                break;
        }
        
        lastAction = null
        return
    }

    numStr += button
    num = Number.parseFloat(numStr)
    UpdateOutput()
}
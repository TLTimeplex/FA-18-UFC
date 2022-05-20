var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
var optionWindow;
var windowBar;

function initOptionWindow() {
    optionWindow = document.getElementById("optionWindow");
    windowBar = document.getElementById("windowBar");
    windowBar.onmousedown = dragMouseDown;

    optionWindow.onmouseenter = activateWindow;
    optionWindow.onmouseleave = deactivateWindow;
}

function activateWindow(e) {
    e = e || window.event;
    e.preventDefault();

    optionWindow.style.opacity = "1";
}

function deactivateWindow(e) {
    e = e || window.event;
    e.preventDefault();

    optionWindow.style.opacity = "0.3";
}

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    windowBar.style.cursor = "grabbing";

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    optionWindow.style.top = (optionWindow.offsetTop - pos2) + "px";
    optionWindow.style.left = (optionWindow.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    windowBar.style.cursor = "grab";
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
}

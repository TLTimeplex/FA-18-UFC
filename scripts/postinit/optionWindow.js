const ow_mode = {
    menu: 0,
    autopilot: 1,
    gpsPoint: 2
};

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
var optionWindow;
var windowBar;
var optionContent;
var windowBarReturn;
var windiwInfo;

var optionWindowMode = ow_mode.menu;
var optionWindowModePre = ow_mode.menu;

function changeAutopilotSystem(system) {
    if (system == 1)
        headingSet = !headingSet;

    if (system == 0)
        autoCourseSet = !autoCourseSet;

    drawOptionWindow();
    menuAutopilot();
}

function changeOwViewBack() {
    changeOwView(optionWindowModePre);
}

function changeOwView(mode) {
    optionWindowModePre = optionWindowMode;
    optionWindowMode = mode;
    drawOptionWindow();
}

function initOptionWindow() {
    optionWindow = document.getElementById("optionWindow");
    windowBar = document.getElementById("windowBar");
    optionContent = document.getElementById("optionContent");
    windowBarClose = document.getElementById("windowBarClose");
    windowBarReturn = document.getElementById("windowBarReturn");
    windiwInfo = document.getElementById("windiwInfo");
    windowBar.onmousedown = dragMouseDown;

    optionWindow.onmouseenter = activateWindow;
    optionWindow.onmouseleave = deactivateWindow;

    drawOptionWindow();
}

function drawOptionWindow() {
    let drawObject;
    switch (optionWindowMode) {
        case ow_mode.menu:
            optionContent.innerHTML = ow_menu;
            windowBarReturn.style.display = "none";
            windiwInfo.innerHTML = "MENU";
            break;
        case ow_mode.autopilot:
            optionContent.innerHTML = ow_autopilot;
            windowBarReturn.style.display = "";
            windowBarReturn.onclick = changeOwViewBack;
            windiwInfo.innerHTML = "AUTOPILOT";

            if (autoCourseSet) {
                document.getElementById("ow_autopilot_autocurs").style.backgroundColor = "green";
            } else {

                document.getElementById("ow_autopilot_autocurs").style.backgroundColor = "gray";
            }
            if (headingSet) {
                document.getElementById("ow_autopilot_headset").style.backgroundColor = "green";
            } else {

                document.getElementById("ow_autopilot_headset").style.backgroundColor = "gray";
                menuAutopilotControl(keys.optionTwo);
            }
            break;
        case ow_mode.gpsPoint:
            windowBarReturn.style.display = "";
            windowBarReturn.onclick = changeOwViewBack;
            windiwInfo.innerHTML = "GPS-Point";

            let infobox = "<span style=\"font-size:1.6em;color:white\">";
            if (GPSLat != null)
                infobox += GPSLat[1] + GPSLat[2] + "\u00B0" + GPSLat[3] + GPSLat[4] + "\"" + GPSLat[5] + GPSLat[6] + "." + GPSLat.split(".")[1] + "' " + (GPSLat[0] === "+" ? "N" : "S");
            infobox += "<br />";
            if (GPSLon != null)
                infobox += GPSLon[1] + GPSLon[2] + GPSLon[3] + "\u00B0" + GPSLon[4] + GPSLon[5] + "\"" + GPSLon[6] + GPSLon[7] + "." + GPSLon.split(".")[1] + "' " + (GPSLon[0] === "+" ? "W" : "O");
            infobox += "<br />";
            if (GPSAlt != null)
                infobox += GPSAlt + (GPSAltIsFeet ? " Feet" : " Meter");

            infobox += "</span>"
            optionContent.innerHTML = infobox;

            break;
    }
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

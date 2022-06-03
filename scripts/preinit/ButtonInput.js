/**
 * Enum for all avaivebl keypress options
 * */
const keys = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    clear: 10,
    enter: 11,
    optionOne: 12,
    optionTwo: 13,
    optionThree: 14,
    optionFour: 15,
    optionFive: 16,
    menuAP: 17,
    menuIFF: 18,
    menuTCN: 19,
    menuILS: 20,
    menuDL: 21,
    menuBCN: 22,
    menuOnOff: 23,
    extraIP: 24,
    extraEmCon: 25,
    invGPSP: 100
};

const sysMode = {
    off: 0,
    startup: 1,
    menu: 2,
    autopilot: 3,
    gpsPoint: 4
};
// Public Nodes
var blocked = false;
var standby = false;
var systemMode = sysMode.off;

// Autopilot Nodes
var headingSet = false;
var autoCourseSet = false;
// Autopilot States
var atthOn = false;
var hselOn = false;
var baltOn = false;
var raltOn = false;
var cplOn = false;

/**
 * 
 * @param {any} Key
 */
function keyInput(key) {
    if (blocked || systemMode == sysMode.off || systemMode == sysMode.startup) return false;
    switch (key) {
        case keys.menuAP:
            systemMode = sysMode.autopilot;
            menuAutopilot();
            return true;
        case keys.invGPSP:
            systemMode = sysMode.gpsPoint;
            menuGPSPoint(false);
            return true;
    }

    switch (systemMode) {
        case sysMode.autopilot:
            menuAutopilotControl(key);
            break;
        case sysMode.gpsPoint:
            menuGPSPointControl(key);
            break;
    }
    return true;
}


function rangeRight(lineLengt, input) {
    let output = "";

    for (let i = 0; i < lineLengt - (input == null ? 0 : input.length); i++)
        output += ' ';
    output += input;
    return output
}

function intToLaton(isLon) {
    let output = "";
    if (isLon) {
        if (GPSLon == null)
            return "";
        for (let i = 0; i < GPSLon.length; i++) {
            if (i == 0) {
                if (GPSLon[0] === '+')
                    output = "E";
                else
                    output = "W";
            }
            if (i == 1 && GPSLon[i] == 1)
                output = "1";


            if (i == 2 || i == 3)
                output += GPSLon[i];
            if (i == 4) {
                output += "\u00B0";
                output += GPSLon[i];
            }
            if (i == 5)
                output += GPSLon[i];
            if (i == 6) {
                output += '"';
                output += GPSLon[i];
            }
            if (i == 7)
                output += GPSLon[i];
        }
        if (output.length < 9)
            for (var i = output.length; i < 9; i++) {
                if (i == 6)
                    output += '"';
                else if (i == 3)
                    output += "\u00B0";
                else
                    output += " ";
            }

    } else {
        if (GPSLat == null)
            return "";
        for (let i = 0; i < GPSLat.length; i++) {
            if (i == 0) {
                if (GPSLat[0] === '+')
                    output += "N";
                else
                    output += "S";
            }
            if (i == 1 || i == 2)
                output += GPSLat[i];
            if (i == 3) {
                output += "\u00B0";
                output += GPSLat[i];
            }
            if (i == 4)
                output += GPSLat[i];
            if (i == 5) {
                output += '"';
                output += GPSLat[i];
            }
            if (i == 6)
                output += GPSLat[i];
        }
        if (output.length < 9)
            for (var i = output.length; i < 9; i++) {
                if (i == 6)
                    output += '"';
                else if (i == 3)
                    output += "\u00B0";
                else
                    output += " ";
            }

    }
    return output;
}

const state = {
    menu: 1,
    lat: 2,
    lon: 3,
    lat2: 4,
    lon2: 5,
    alt: 6
}
const inputMask = "   \u00B0  \"  "

var GPSstate;
var GPSLat;
var GPSLon;
var GPSAlt;
var GPSAltIsFeet = true;
function menuGPSPoint(back) {
    let displaySet = [];
    if (back || GPSstate == null)
        GPSstate = state.menu;
    switch (GPSstate) {
        case state.lon:
            displaySet.push(intToLaton(true));
            break;
        case state.lat:
            displaySet.push(intToLaton(false));
            break;
        case state.lat2:
            displaySet.push(rangeRight(9, GPSLat.split(".")[1]));
            break;
        case state.lon2:
            displaySet.push(rangeRight(9, GPSLon.split(".")[1]));
            break;
        case state.alt:
            displaySet.push(rangeRight(9, GPSAlt));
            break;
        default:
            displaySet.push("");
            break;
    }
    switch (GPSstate) {
        case state.alt:
            displaySet.push("");
            displaySet.push(GPSAltIsFeet ? ":FEET" : " FEET");
            displaySet.push(GPSAltIsFeet ? " METR" : ":METR");
            displaySet.push("");
            displaySet.push("");
            break;
        case state.menu:
            drawOptionWindow();
        default:
            displaySet.push(GPSstate == state.lat || GPSstate == state.lat2 ? ":LAT" : " LAT");
            displaySet.push("");
            displaySet.push(GPSstate == state.lon || GPSstate == state.lon2 ? ":LON" : " LON");
            displaySet.push("");
            displaySet.push(" ALT");
            break;
    }

    setMenuSet(displaySet);
    updateScreens();
}

function menuGPSPointControl(key) {
    switch (GPSstate) {
        case state.menu:
            switch (key) {
                case keys.optionOne:
                    GPSLat = null;
                    GPSstate = state.lat;
                    break;
                case keys.optionThree:
                    GPSLon = null;
                    GPSstate = state.lon;
                    break;
                case keys.optionFive:
                    GPSAlt = null;
                    GPSstate = state.alt;
                    break;
            }
            break;
        case state.alt:
            switch (key) {
                case keys.optionTwo:
                    GPSAlt = null;
                    GPSAltIsFeet = true;
                    break;
                case keys.optionThree:
                    GPSAlt = null;
                    GPSAltIsFeet = false;
                    break;
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    if (GPSAlt == null)
                        GPSAlt = "";
                    GPSAlt += key;
                    break;
                case keys.clear:
                    GPSAlt = null;
                    break;
                case keys.enter:
                    GPSstate = state.menu;
                    break;
            }
            break;
        case state.lat:
            switch (key) {
                case keys.optionThree:
                    GPSLat = null;
                    GPSstate = state.lon;
                    break;
                case keys.optionFive:
                    GPSLat = null;
                    GPSstate = state.alt;
                    break;
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    console.log(key);
                    if (GPSLat === null) {
                        if (key == 2)
                            GPSLat = "+";
                        else if (key == 8)
                            GPSLat = "-";
                        break;
                    }
                    if (GPSLat.length < 7)
                        GPSLat += key;
                    break;
                case keys.clear:
                    GPSLat = null;
                    break;
                case keys.enter:
                    if (GPSLat.length !== 7)
                        break;
                    GPSstate = state.lat2;
                    GPSLat += ".";
                    break;
            }
            break;
        case state.lat2:
            switch (key) {
                case keys.optionThree:
                    GPSLat = null;
                    GPSstate = state.lon;
                    break;
                case keys.optionFive:
                    GPSLat = null;
                    GPSstate = state.alt;
                    break;
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    if (GPSLat.split(".")[1].length < 9)
                        GPSLat += key;
                    break;
                case keys.clear:
                    GPSstate = state.lat;
                    GPSLat = null;
                    break;
                case keys.enter:
                    GPSstate = state.menu;
                    break;
            }
            break;
        case state.lon:
            switch (key) {
                case keys.optionOne:
                    GPSLon = null;
                    GPSstate = state.lat;
                    break;
                case keys.optionFive:
                    GPSLon = null;
                    GPSstate = state.alt;
                    break;
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    console.log(key);
                    if (GPSLon === null) {
                        if (key == 6)
                            GPSLon = "+";
                        else if (key == 4)
                            GPSLon = "-";
                    } else if (GPSLon.length === 1) {
                        if (key != 1) {
                            GPSLon += "0";
                        }
                        GPSLon += key;
                    }else if (GPSLon.length < 8)
                        GPSLon += key;
                    break;
                case keys.clear:
                    GPSLon = null;
                    break;
                case keys.enter:
                    if (GPSLon.length !== 8)
                        break;
                    GPSstate = state.lon2;
                    GPSLon += ".";
                    break;
            }
            break;
        case state.lon2:
            switch (key) {
                case keys.optionOne:
                    GPSLon = null;
                    GPSstate = state.lat;
                    break;
                case keys.optionFive:
                    GPSLon = null;
                    GPSstate = state.alt;
                    break;
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    if (GPSLon.split(".")[1].length < 9)
                        GPSLon += key;
                    break;
                case keys.clear:
                    GPSstate = state.lon;
                    GPSLat = null;
                    break;
                case keys.enter:
                    GPSstate = state.menu;
                    break;
            }
            break;
    }
    menuGPSPoint(false);
}

function menuAutopilot() {
    let displaySet = [""];
    displaySet.push((atthOn ? ":" : " ") + "ATTH");
    displaySet.push((hselOn ? ":" : " ") + "HSEL");
    displaySet.push((baltOn ? ":" : " ") + "BALT");
    displaySet.push((raltOn ? ":" : " ") + "RALT");
    if (autoCourseSet)
        displaySet.push(cplOn ? ":CPL " : " CPL");
    else
        displaySet.push("");

    setMenuSet(displaySet);
    updateScreens();
}

function menuAutopilotControl(key) {
    switch (key) {
        case keys.optionOne:
            atthOn = !atthOn;
            hselOn = false;
            baltOn = false;
            raltOn = false;
            cplOn = false;
            break;
        case keys.optionTwo:
            if (!headingSet) {
                hselOn = false;
                break;
            }
            atthOn = false;
            hselOn = !hselOn;
            cplOn = false;
            break;
        case keys.optionThree:
            baltOn = !baltOn;
            raltOn = false;
            break;
        case keys.optionFour:
            baltOn = false;
            raltOn = !raltOn;
            break;
        case keys.optionFive:
            if (!autoCourseSet)
                break;
            if (cplOn) {
                atthOn = false;
                hselOn = false;
                cplOn = false;
            } else {
                atthOn = false;
                hselOn = false;
                cplOn = true;
                baltOn = false;
                menuAutopilotControl(keys.optionThree);
            }
            break;
    }

    menuAutopilot();

}
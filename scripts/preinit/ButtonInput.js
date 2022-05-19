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
    extraEmCon: 25
};

const sysMode = {
    off: 0,
    startup: 1,
    menu: 2,
    autopilot: 3
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
    if (blocked || systemMode == sysMode.off || systemMode == sysMode.startup) return;
    switch (key) {
        case keys.menuAP:
            systemMode = sysMode.autopilot;
            menuAutopilot();
            return;
    }

    switch (systemMode) {
        case sysMode.autopilot:
            menuAutopilotControl(key);
            break;
    }
}

function menuAutopilot() {
    let displaySet = [""];
    displaySet.push((atthOn ? ":" : " ") + "ATTH");
    displaySet.push((hselOn ? ":" : " ") + "HSEL");
    displaySet.push((baltOn ? ":" : " ") + "BALT");
    displaySet.push((raltOn ? ":" : " ") + "RALT");
    if (autoCourseSet)
        displaySet.push(cplOn ? ":CPL " : " CPL");

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
            atthOn = false;
            hselOn = !hselOn;
            cplOn = false;
            break;
        case keys.optionThree:
            atthOn = false;
            baltOn = !baltOn;
            raltOn = false;
            break;
        case keys.optionFour:
            atthOn = false;
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
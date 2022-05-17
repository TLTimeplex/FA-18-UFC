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

var blocked = false;
var standby = false;
var systemMode = sysMode.off;


/**
 * 
 * @param {any} Key
 */
function keyInput(key) {
    if (blocked || systemMode == sysMode.off || systemMode == sysMode.startup) return;
}
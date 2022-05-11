var screenContent = ["**8888888", ":****", ":****", ":****", ":****", ":****"];
var screenLeftChannel = 1;
var screenRightChannel = 1;

var MenuSetEmpty = ["", "", "", "", "", "", null, null];
var MenuSetStandBy = ["", "", "", "", "", "", screenLeftChannel, screenRightChannel];
var MenuSetPreTest = [".........", ":AUTO", ":SELF", ":TEST", ":PLS", ":STBY", 1, 1];
var MenuSetTest = ["**8888888", ":****", ":****", ":****", ":****", ":****", 8, 8];


const brightnessKnob = document.getElementById("Brightness");
const leftVolumeKnob = document.getElementById("LeftVolume");
const rightVolumeKnob = document.getElementById("RightVolume"); 

brightnessKnobValue = 50;
leftVolumeKnobValue = 50;
rightVolumeKnobValue = 50;

function setMenuSet(set) {
    screenContent[0] = set[0];
    screenContent[1] = set[1];
    screenContent[2] = set[2];
    screenContent[3] = set[3];
    screenContent[4] = set[4];
    screenContent[5] = set[5];

    screenLeftChannel = set[6];
    screenRightChannel = set[7];
}

function initScreen() {
    setMenuSet(MenuSetEmpty);
    updateScreens();

    setTimeout(function () {
        setMenuSet(MenuSetPreTest);
        updateScreens();
    }, 1000);

    setTimeout(function () {
        screenContent[0] = "-........";
        updateScreen(0);
    }, 2000);

    setTimeout(function () {
        screenContent[0] = "--.......";
        updateScreen(0);
    }, 3000);

    setTimeout(function () {
        screenContent[0] = "---......";
        updateScreen(0);
    }, 4000);

    setTimeout(function () {
        screenContent[0] = "----.....";
        updateScreen(0);
    }, 5000);

    setTimeout(function () {
        screenContent[0] = "-----....";
        updateScreen(0);
    }, 6000);

    setTimeout(function () {
        screenContent[0] = "------...";
        updateScreen(0);
    }, 7000);

    setTimeout(function () {
        screenContent[0] = "-------..";
        updateScreen(0);
    }, 7500);

    setTimeout(function () {
        screenContent[0] = "--------.";
        updateScreen(0);
    }, 8000);

    setTimeout(function () {
        screenContent[0] = "---------";
        updateScreen(0);
    }, 8500);


    setTimeout(function () {
        setMenuSet(MenuSetTest);
        updateScreens();
    }, 9000);


    setTimeout(function () {
        screenLeftChannel = 1;
        screenRightChannel = 1;
        setMenuSet(MenuSetStandBy);
        updateScreens();
    }, 15000);
}

/**
 * Updates all 7 Displays at once
 * */
function updateScreens() {
    for (var i = 0; i < 8; i++) {
        updateScreen(i);
    }
}

/**
 * Updates an specific display
 * 
 * 0 - Main Display
 * 1 to 5 - Option Displays from top to bottom
 * 6 - Left channel Display
 * 7 - Right channel Display
 * 
 * @param {number} dis
 */
function updateScreen(dis) {
    var segment;
    var text;

    switch (dis) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            segment = document.getElementsByClassName("Display" + dis + "Symbol");
            text = screenContent[dis];
            break;
        case 6:
            document.getElementById("LeftRowDisplay").innerHTML = screenLeftChannel;
            return;
        case 7:
            document.getElementById("RightRowDisplay").innerHTML = screenRightChannel;
            return;
        default:
            console.error("Wrong display request! : " + dis)
            return;
    }

    for (var i = 0; i < segment.length; i++) {
        segment[i].innerHTML = text.charAt(i);
    }
}

function scrollRVK(event) {
    if (event.deltaY > 0) {
        rightVolumeKnobValue -= 3;
    } else {
        rightVolumeKnobValue += 3;
    }

    rightVolumeKnobValue = Math.min(Math.max(0, rightVolumeKnobValue), 100);

    var orientationRVK = ((270 / 100) * rightVolumeKnobValue) - (270 / 2);
    rightVolumeKnob.style.transform = 'rotate(' + orientationRVK + 'deg)';
}

function scrollLVK(event) {
    if (event.deltaY > 0) {
        leftVolumeKnobValue -= 3;
    } else {
        leftVolumeKnobValue += 3;
    }

    leftVolumeKnobValue = Math.min(Math.max(0, leftVolumeKnobValue), 100);

    var orientationLVK = ((270 / 100) * leftVolumeKnobValue) - (270 / 2);
    leftVolumeKnob.style.transform = 'rotate(' + orientationLVK + 'deg)';
}

function scrollBRT(event) {
    if (event.deltaY > 0) {
        brightnessKnobValue -= 3;
    } else {
        brightnessKnobValue += 3;
    }

    brightnessKnobValue = Math.min(Math.max(0, brightnessKnobValue), 100);

    var orientationBRT = ((270 / 100) * brightnessKnobValue) - (270 / 2);
    brightnessKnob.style.transform = 'rotate(' + orientationBRT + 'deg)';
}

rightVolumeKnob.onwheel = scrollRVK;
leftVolumeKnob.onwheel = scrollLVK;
brightnessKnob.onwheel = scrollBRT;

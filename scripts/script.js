var screenContent = ["**8888888", ":****", ":****", ":****", ":****", ":****"];
var screenLeftChannel = 1;
var screenRightChannel = 1;

var MenuSetEmpty = ["", "", "", "", "", "", null, null];
var MenuSetStandBy = ["", "", "", "", "", "", screenLeftChannel, screenRightChannel];
var MenuSetPreTest = [".........", ":AUTO", ":SELF", ":TEST", ":PLS", ":STBY", 1, 1];
var MenuSetTest1 = ["**8888888", ":****", ":****", ":****", ":****", ":****", 8, 8];
var MenuSetTest2 = ["OO.......", ":OOOO", ":OOOO", ":OOOO", ":OOOO", ":OOOO", 18, 18];


const brightnessKnob = document.getElementById("Brightness");
const leftVolumeKnob = document.getElementById("LeftVolume");
const rightVolumeKnob = document.getElementById("RightVolume"); 

brightnessKnobValue = 50;
leftVolumeKnobValue = 50;
rightVolumeKnobValue = 50;

const comm1Knob = document.getElementById("COMM1_Knob");
const comm2Knob = document.getElementById("COMM2_Knob");

comm1KnobValue = 0;
comm2KnobValue = 0;

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


    setTimeout(() => {
        setMenuSet(MenuSetTest1);
        updateScreens();
    }, 9000);

    setTimeout(function () {
        setMenuSet(MenuSetTest2);
        updateScreens();
    }, 12500);
    

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


function scrollCOMM1(event) {
    if (event.deltaY > 1) {
        comm1KnobValue += (100 / 19);
    } else if (event.deltaY < -1){
        comm1KnobValue -= (100 / 19);
    }

    comm1KnobValue = Math.min(Math.max(0, comm1KnobValue), 100 - (100 / 19));

    screenLeftChannel = Math.round(comm1KnobValue / (100 / 19)) + 1;
    updateScreen(6);

    var orientationCOMM1 = ((360 / 100) * comm1KnobValue);
    comm1Knob.style.transform = 'rotate(' + orientationCOMM1 + 'deg)';
}

function scrollCOMM2(event) {
    if (event.deltaY > 1) {
        comm2KnobValue += (100 / 19);
    } else if (event.deltaY < -1) {
        comm2KnobValue -= (100 / 19);
    }

    comm2KnobValue = Math.min(Math.max(0, comm2KnobValue), 100 - (100 / 19));

    screenRightChannel = Math.round(comm2KnobValue / (100 / 19)) + 1;
    updateScreen(7);

    var orientationCOMM2 = ((360 / 100) * comm2KnobValue);
    comm2Knob.style.transform = 'rotate(' + orientationCOMM2 + 'deg)';
}

function scrollRVK(event) {
    if (event.deltaY < 0) {
        rightVolumeKnobValue -= 3;
    } else {
        rightVolumeKnobValue += 3;
    }

    rightVolumeKnobValue = Math.min(Math.max(0, rightVolumeKnobValue), 100);

    var orientationRVK = ((270 / 100) * rightVolumeKnobValue) - (270 / 2);
    rightVolumeKnob.style.transform = 'rotate(' + orientationRVK + 'deg)';
}

function scrollLVK(event) {
    if (event.deltaY < 0) {
        leftVolumeKnobValue -= 3;
    } else {
        leftVolumeKnobValue += 3;
    }

    leftVolumeKnobValue = Math.min(Math.max(0, leftVolumeKnobValue), 100);

    var orientationLVK = ((270 / 100) * leftVolumeKnobValue) - (270 / 2);
    leftVolumeKnob.style.transform = 'rotate(' + orientationLVK + 'deg)';
}

function scrollBRT(event) {
    if (event.deltaY < 0) {
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

comm1Knob.onwheel = scrollCOMM1;
comm2Knob.onwheel = scrollCOMM2;

initScreen();
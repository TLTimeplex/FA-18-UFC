/*"Current" Screen values */
var screenContent = ["**8888888", ":****", ":****", ":****", ":****", ":****"]; //S0, S1, ..., S5
var screenLeftChannel = 1;
var screenRightChannel = 1;

/*Screen Presets*/
var MenuSetEmpty = ["", "", "", "", "", "", null, null];
var MenuSetStandBy = ["", "", "", "", "", "", screenLeftChannel, screenRightChannel];
var MenuSetPreTest = [".........", ":AUTO", ":SELF", ":TEST", ":PLS", ":STBY", 1, 1];
var MenuSetTest1 = ["**8888888", ":****", ":****", ":****", ":****", ":****", 8, 8];
var MenuSetTest2 = ["OO.......", ":OOOO", ":OOOO", ":OOOO", ":OOOO", ":OOOO", 18, 18];

/***********************************************************/

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
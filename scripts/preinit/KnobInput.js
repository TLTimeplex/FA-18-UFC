/* Direct Knob init & current values */
var brightnessKnob;
var leftVolumeKnob;
var rightVolumeKnob;

brightnessKnobValue = 50;
leftVolumeKnobValue = 50;
rightVolumeKnobValue = 50;

/* Non Direct Knob inti & current Values */
var comm1Knob;
var comm2Knob;

comm1KnobValue = 0;
comm2KnobValue = 0;
/* ****************************************************************** */

function scrollCOMM1(event) {
    if (event.deltaY > 1) {
        comm1KnobValue += (100 / 19);
    } else if (event.deltaY < -1) {
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
function init() {
    //Mount html objecs to js
    brightnessKnob = document.getElementById("Brightness");
    leftVolumeKnob = document.getElementById("LeftVolume");
    rightVolumeKnob = document.getElementById("RightVolume");

    comm1Knob = document.getElementById("COMM1_Knob");
    comm2Knob = document.getElementById("COMM2_Knob");


    // Add event Listeners on the knobs
    rightVolumeKnob.onwheel = scrollRVK;
    leftVolumeKnob.onwheel = scrollLVK;
    brightnessKnob.onwheel = scrollBRT;

    comm1Knob.onwheel = scrollCOMM1;
    comm2Knob.onwheel = scrollCOMM2;

    //Start screen animation
    systemMode = sysMode.startup;
    initScreen();

    initOptionWindow();
}
window.onload = init;

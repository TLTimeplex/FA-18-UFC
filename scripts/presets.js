var ow_menu = 'Select a Menu:<br/><table><tr><td><button id="ow_menu_ap" class="ow_button" onclick="if(keyInput(keys.menuAP))changeOwView(ow_mode.autopilot);">Autopilot</button></td><td><button id="ow_menu_ap" class="ow_button" onclick="if(keyInput(keys.invGPSP))changeOwView(ow_mode.gpsPoint);">GPS-Point</button></td></tr></table>';
var ow_autopilot = 'Current State of System:<br /><table><tbody><tr><td><button id="ow_autopilot_atth" class="ow_autopilot_button" onclick="menuAutopilotControl(keys.optionOne)">ATTH</button></td><td><button id="ow_autopilot_hsel" class="ow_autopilot_button" onclick="menuAutopilotControl(keys.optionTwo)">HSEL</button></td><td><button id="ow_autopilot_balt" class="ow_autopilot_button" onclick="menuAutopilotControl(keys.optionThree)">BALT</button></td><td><button id="ow_autopilot_ralt" class="ow_autopilot_button" onclick="menuAutopilotControl(keys.optionFour)">RALT</button></td><td><button id="ow_autopilot_cpl" class="ow_autopilot_button" onclick="menuAutopilotControl(keys.optionFive)">CPL</button></td></tr><tr><td colspan="4">System State:</td></tr><tr><td><button id="ow_autopilot_autocurs" class="ow_autopilot_button" onclick="changeAutopilotSystem(0)">Autocours<br /> Set</button></td><td><button id="ow_autopilot_headset" class="ow_autopilot_button" onclick="changeAutopilotSystem(1)">Heading<br />Set</button></td></tr></tbody></table>';


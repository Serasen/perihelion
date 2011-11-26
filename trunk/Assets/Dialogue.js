var dialogue : TextAsset;
var skin : GUISkin;
private var letterStandard = 0.1;
private var letterPause = letterStandard;
private var hasBeenTriggered = false;
private var dial;

private var currentDial = "";

function Start() {
	if(dialogue) dial = dialogue.text;
	else Debug.Log("Sorry; no file has been chosen!");
}

function OnTriggerEnter() {
	if(dialogue) {
		if(!hasBeenTriggered) {
			hasBeenTriggered = true;
			ReadDial();
		}
	}	
	
}

function OnGUI() {
	letterPause = letterStandard;
	GUI.skin = skin;
	if(GUI.RepeatButton(Rect(Screen.width/4,0,Screen.width/2,Screen.height/3), currentDial)) {
		letterPause = letterStandard/4;
	}
}

private function ReadDial () {
	for(var letter in dial) {
		currentDial += letter; 
		yield WaitForSeconds (letterPause); 
	}
	yield WaitForSeconds (letterPause*2);
	currentDial = "";

}
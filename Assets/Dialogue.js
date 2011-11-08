var dialogue : TextAsset;
var dialStyle : GUIStyle;
private var showBox = false;
private var hasBeenTriggered = false;
private var dial;
private var index = 0;
private var dialLength;


function OnTriggerEnter() {
		if(dialogue) {
			if(!hasBeenTriggered) {
				dial = dialogue.text.Split("\n"[0]);
				dialLength = dial.length;
				showBox = true;
				hasBeenTriggered = true;
			}
		}
		else Debug.Log("Sorry; no file has been chosen!");	
	
}

function OnGUI() {
	if(showBox && index < dialLength) {
		if (GUI.Button (Rect (Screen.width/4,0,Screen.width/2,50), dial[index], dialStyle)) {
			index++;
		}
	}
	else showBox = false;
}
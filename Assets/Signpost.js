var offset = Vector3.up;    // Units in world space to offset; 1 unit above object by default
var dialSkin : GUISkin;
var signSkin : GUISkin;
var signText : TextAsset;
private var guiPoint : Vector3;		//Determines location of popup GUI relative to screen
private var visible = false;	//Indicates whether popup GUI is visible
private var reading = false; //Determines whether to display signpost or game

function OnTriggerEnter() {
	visible = true;
}

function OnTriggerExit() {
	visible = false;
}

function OnGUI () {
	if(reading) {
		GUI.skin = signSkin;
		if(GUI.Button(new Rect(Screen.width/8, Screen.height/8, 
							   Screen.width*3/4, Screen.height*3/4), signText.text)) {
			reading = false;
			Time.timeScale = 1; //this is really fun for experimenting!
		}
	}
	else if(visible) {
		GUI.skin = dialSkin;
		guiPoint = Camera.main.WorldToScreenPoint(transform.position + offset);
		if(GUI.Button(new Rect(guiPoint.x, Screen.height - guiPoint.y, 100, 20), "Read Signpost")) {
			reading = true;
			Time.timeScale = 0;
		}
	}
}
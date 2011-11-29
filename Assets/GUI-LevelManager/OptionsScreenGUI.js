public var backGround : Texture;
public var sound : Texture;
public var control : Texture;
public var soundOn1 : Texture;
public var soundOn2 : Texture;
public var soundOff1 : Texture;
public var soundOff2 : Texture;
public var contLeft1 : Texture;
public var contLeft2 : Texture;
public var contRight1 : Texture;
public var contRight2 : Texture;

public var soundOnGuiStyle : GUIStyle;
public var soundOffGuiStyle : GUIStyle;
public var controlLeftGuiStyle : GUIStyle;
public var controlRightGuiStyle : GUIStyle;
public var backGuiStyle : GUIStyle;

private var lm : GameObject;

private var soundOnOff = false;
private var controlLeftRight = true;

  
function pauseSeconds(sec : float)
{
	yield WaitForSeconds(sec);
	Debug.Log("Hityeah");
}

function Sound (ss : boolean)
{
	if (ss)
	{
		Camera.mainCamera.gameObject.GetComponent(AudioListener).enabled = true;
	}
	else
	{
		Camera.mainCamera.gameObject.GetComponent(AudioListener).enabled = false;
	}
}

function Start()
{
	lm = GameObject.Find("LevelManager(Clone)");
	
	if (lm.GetComponent(LevelManager).GetSound() == true)
	{
		soundOnGuiStyle.normal.background = soundOn2;
		soundOffGuiStyle.normal.background = soundOff1;	
	}
	else
	{
		soundOffGuiStyle.normal.background = soundOff2;
		soundOnGuiStyle.normal.background = soundOn1;
	}
	
	if (lm.GetComponent(LevelManager).GetController() == true)
	{
		controlLeftGuiStyle.normal.background = contLeft1;
		controlRightGuiStyle.normal.background = contRight2;	
	}
	else
	{
		controlLeftGuiStyle.normal.background = contLeft2;
		controlRightGuiStyle.normal.background = contRight1;
	}
	
}
  
function OnGUI()
{
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), backGround, ScaleMode.StretchToFill, true, 0);

	GUI.DrawTexture(Rect(Screen.width * 0.5/10, Screen.height * 0.5/10, Screen.width * 3/10, Screen.height * 2/10), sound, ScaleMode.StretchToFill, true, 0);
	
	GUI.DrawTexture(Rect(Screen.width * 0.5/10, Screen.height * 2.5/10, Screen.width * 3/10, Screen.height * 2/10), control, ScaleMode.StretchToFill, true, 0);	
	
	
	
	if (GUI.Button(Rect(Screen.width * 4.8/10, Screen.height * 0.9/10, Screen.width * 1.5/10, Screen.height * 1.5/10),"", soundOnGuiStyle))
	{
		soundOnGuiStyle.normal.background = soundOn2;
		soundOffGuiStyle.normal.background = soundOff1;
		lm.GetComponent(LevelManager).SetSound(true);
	}
	
	if (GUI.Button(Rect(Screen.width * 7/10, Screen.height * 1/10, Screen.width* 1.7/10, Screen.height * 1.7/10),"", soundOffGuiStyle))
	{
		soundOffGuiStyle.normal.background = soundOff2;
		soundOnGuiStyle.normal.background = soundOn1;
		lm.GetComponent(LevelManager).SetSound(false);
	}
	
	if (GUI.Button(Rect(Screen.width * 1.7/10, Screen.height * 4.5/10, Screen.width* 2.5/10, Screen.height * 2.5/10),"", controlLeftGuiStyle))
	{
		controlLeftGuiStyle.normal.background = contLeft1;
		controlRightGuiStyle.normal.background = contRight2;
		lm.GetComponent(LevelManager).SetController(true);
	}
	
	if (GUI.Button(Rect(Screen.width * 5.6/10, Screen.height * 4.5/10, Screen.width* 2.5/10, Screen.height * 2.5/10),"", controlRightGuiStyle))
	{
		controlLeftGuiStyle.normal.background = contLeft2;
		controlRightGuiStyle.normal.background = contRight1;
		lm.GetComponent(LevelManager).SetController(false);
	}
	
	if (GUI.Button(Rect(Screen.width * 4/10, Screen.height * 7.7/10, Screen.width* 2/10, Screen.height * 2/10),"", backGuiStyle))
	{
		pauseSeconds(.5);
		Application.LoadLevel("mainScreen");
	}

}


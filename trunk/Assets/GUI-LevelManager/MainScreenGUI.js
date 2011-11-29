public var backGround : Texture;
public var logo : Texture;


public var playGuiStyle : GUIStyle;
public var optionsGuiStyle : GUIStyle;
public var exitGuiStyle : GUIStyle;

  
function pauseSeconds(sec : float)
{
	yield WaitForSeconds(sec);
}

  
function OnGUI()
{
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), backGround, ScaleMode.StretchToFill, true, 0);
	
	GUI.DrawTexture(Rect(Screen.width * 2.5/10, Screen.height * 0.5/10, Screen.width * 6/10, Screen.height * 6/10), logo, ScaleMode.StretchToFill, true, 0);

	if (GUI.Button(Rect(Screen.width * 1.4/10, Screen.height * 7/10, Screen.width* 2/10, Screen.height * 2/10),"", playGuiStyle))
	{
		pauseSeconds(.5);
		Application.LoadLevel("chapterSelectionScreen");
	}
	
	if (GUI.Button(Rect(Screen.width * 3.9/10, Screen.height * 7.05/10, Screen.width* 2.5/10, Screen.height * 2/10),"", optionsGuiStyle))
	{
		pauseSeconds(.5);
		Application.LoadLevel("optionsScreen");
	}
	
	if (GUI.Button(Rect(Screen.width * 6.9/10, Screen.height * 7.1/10, Screen.width* 2/10, Screen.height * 1.5/10),"", exitGuiStyle))
	{
		GameObject.Find("LevelManager(Clone)").GetComponent(LevelManager).SaveData();
		pauseSeconds(.5);
		Application.Quit();
	}

}



public var backGround : Texture;
public var chapterLogo : Texture;

public var backGuiStyle : GUIStyle;
public var chapGuiStyle : GUIStyle[];

private var lm : GameObject;
private var chapters : int;




function pauseSeconds(sec : float)
{
	yield WaitForSeconds(sec);
	Debug.Log("Hityeah");
}


function Awake()
{
	lm = GameObject.Find("LevelManager(Clone)");
	chapters = lm.GetComponent(LevelManager).GetChapLength();
}

function OnGUI()
{
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), backGround, ScaleMode.StretchToFill, true, 0);
	
	GUI.DrawTexture(Rect(Screen.width * 2/10, Screen.height * 0.5/10, Screen.width * 6/10, Screen.height * 2/10), chapterLogo, ScaleMode.StretchToFill, true, 0);

	if (GUI.Button(Rect(Screen.width * 4/10, Screen.height * 8/10, Screen.width* 2/10, Screen.height * 1.5/10),"", backGuiStyle))
	{
		pauseSeconds(0.5);
		Application.LoadLevel("mainScreen");
	}
	

	switch (chapters)
	{
		case 2:
			if (GUI.Button(Rect(Screen.width * .5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"1", chapGuiStyle[0]))
			{
				pauseSeconds(0.5);
				lm.GetComponent(LevelManager).SetChapSelect(1);
				Application.LoadLevel("levelSelectionScreen");
			}
			
			if (GUI.Button(Rect(Screen.width * 3/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"2", chapGuiStyle[1]))
			{
				pauseSeconds(0.5);
				lm.GetComponent(LevelManager).SetChapSelect(2);
				Application.LoadLevel("levelSelectionScreen");
			}
			break;
		default:
			if (GUI.Button(Rect(Screen.width * .5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"1", chapGuiStyle[0]))
			{
				pauseSeconds(0.5);
				lm.GetComponent(LevelManager).SetChapSelect(0);
				Application.LoadLevel("levelSelectionScreen");
			}
			break;
	
	}

/*	
	if (GUI.Button(Rect(Screen.width * 6.9/10, Screen.height * 7.1/10, Screen.width* 2/10, Screen.height * 1.5/10),"", exitGuiStyle))
	{
		pauseSeconds(.5);
		Application.Quit();
	}
*/
}
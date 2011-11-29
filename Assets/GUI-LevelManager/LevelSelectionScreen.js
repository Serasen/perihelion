public var backGround : Texture;
public var levelLogo : Texture;

public var backGuiStyle : GUIStyle;
public var levelGuiStyle : GUIStyle[];

private var chapter = 0;
private var levels : int;
private var bonus : int;

private var lm : GameObject;

function pauseSeconds(sec : float)
{
	yield WaitForSeconds(sec);
	Debug.Log("Hityeah");
}

// get chapter from level manager which gets it from the chapter selection screen
// get levels completed from level manager which gets it from its array
function Start()
{
	lm = GameObject.Find("LevelManager(Clone)");
	chapter = lm.GetComponent(LevelManager).GetChapSelect();
	levels = lm.GetComponent(LevelManager).GetLevelLength(chapter);	
	//bonus = lm.GetComponent(LevelManager).GetBonus(chapter);
}

function OnGUI()
{
	GUI.DrawTexture(Rect(0,0, Screen.width, Screen.height), backGround, ScaleMode.StretchToFill, true, 0);
	
	GUI.DrawTexture(Rect(Screen.width * 2.2/10, Screen.height * 0.5/10, Screen.width * 5.7/10, Screen.height * 1.6/10), levelLogo, ScaleMode.StretchToFill, true, 0);

	// back button
	if (GUI.Button(Rect(Screen.width * 4/10, Screen.height * 8/10, Screen.width* 2/10, Screen.height * 1.5/10),"", backGuiStyle))
	{
		pauseSeconds(0.5);
		Application.LoadLevel("chapterSelectionScreen");
	}
	

	// select chapter from previous screen to determine button texture.. for each chapter, there is a level completion switch statement
	switch (chapter)
	{
		case 2: //CHAPTER 2
			switch (levels)
			{
				case 2: //CHAPTER 2 LEVEL 2
					if (GUI.Button(Rect(Screen.width * .5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"1", levelGuiStyle[1]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test0");
					}
					
					if (GUI.Button(Rect(Screen.width * 3/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"2", levelGuiStyle[1]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test2");
					}
					break;
				case 3: //CHAPTER 2 LEVEL 3
					if (GUI.Button(Rect(Screen.width * .5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"1", levelGuiStyle[1]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test0");
					}
					
					if (GUI.Button(Rect(Screen.width * 3/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"2", levelGuiStyle[1]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test2");
					}
					
					if (GUI.Button(Rect(Screen.width * 5.5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"3", levelGuiStyle[1]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test2");
					}
					break;
				default: //CHAPTER 2 LEVEL 1
					if (GUI.Button(Rect(Screen.width * .5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"1", levelGuiStyle[1]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test0");
					}
					break;
			
			}
			break;
		default: //CHAPTER 1
			switch (levels)
			{
				case 2: //CHAPTER 1 LEVEL 2
					if (GUI.Button(Rect(Screen.width * .5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"1", levelGuiStyle[0]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test0");
					}
					
					if (GUI.Button(Rect(Screen.width * 3/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"2", levelGuiStyle[0]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test1");
					}
					break;
				case 3: //CHAPTER 1 LEVEL 3
					if (GUI.Button(Rect(Screen.width * .5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"1", levelGuiStyle[0]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test0");
					}
					
					if (GUI.Button(Rect(Screen.width * 3/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"2", levelGuiStyle[0]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test1");
					}
					
					if (GUI.Button(Rect(Screen.width * 5.5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"3", levelGuiStyle[0]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test2");
					}
					break;
				default: //CHAPTER 1 LEVEL 1
					if (GUI.Button(Rect(Screen.width * .5/10, Screen.height * 2.5/10, Screen.width* 2/10, Screen.height * 2.5/10),"1", levelGuiStyle[0]))
					{
						pauseSeconds(0.5);
						Application.LoadLevel("test0");
					}
					break;
			}
	
	}

/*	
	if (GUI.Button(Rect(Screen.width * 6.9/10, Screen.height * 7.1/10, Screen.width* 2/10, Screen.height * 1.5/10),"", exitGuiStyle))
	{
		pauseSeconds(.5);
		Application.Quit();
	}
*/
}
public var levelManager : GameObject;

function Start ()
{	
	var temp = GameObject.Find("LevelManager(Clone)");
	if (temp == null)
	{
		GameObject.Instantiate(levelManager);
	}
	
}

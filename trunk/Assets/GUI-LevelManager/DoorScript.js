public var chapter = 0;
public var level = 0;
public var nextLevelName : String;
public var bonusLevel = false;

private var target : GameObject;
private var lm : LevelManager;
private var doorEntered = false;

function Awake()
{
	target = GameObject.Find("Player");
	lm = GameObject.Find("LevelManager(Clone)").GetComponent(LevelManager);	
}


function OnTriggerEnter(col : Collider)
{
	if(col.gameObject.name == "Player")
	{
		doorEntered = true;
		yield WaitForSeconds(1);
		Application.LoadLevel("" + nextLevelName);
	
	}
}

function Update()
{
	if (doorEntered)
	{
		target.rigidbody.velocity = Vector3.zero;
		
		lm.SetChapLevel(chapter, level, 1);
		
		if (!bonusLevel)
		{
			lm.SetBonusChapLevel(chapter, level, 0);
		}
		else
		{
			lm.SetBonusChapLevel(chapter, level, 1);
		}		
		
	}

}
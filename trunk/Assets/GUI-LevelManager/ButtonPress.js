private var touched = false;
private var initY : float;
var blink : GameObject;
var wall : GameObject;

function Start()
{
	initY = transform.localPosition.y;
}



function Update () 
{
	if (touched == false)
	{
		blink.light.intensity = Mathf.PingPong(Time.time, 1);
		
	}
	else
	{
		transform.localPosition.y = Mathf.Lerp(transform.localPosition.y, initY + 0.8, Time.deltaTime);
	}
}


function OnCollisionEnter(col : Collision)
{
	if (col.gameObject.name == "Player")
	{		
		GameObject.Destroy(blink);
		GameObject.Destroy(wall);
		touched = true;	
	}
}


private var touched = false;
private var initX : float;
var blink : GameObject;
var wall : GameObject;

function Start()
{
	initX = transform.position.x;
}



function Update () 
{
	if (touched == false)
	{
		blink.light.intensity = Mathf.PingPong(Time.time, 1);
		
	}
	else
	{
		transform.position.x = Mathf.Lerp(transform.position.x, initX + 0.8, Time.deltaTime);
	}
}


function OnCollisionEnter(col : Collision)
{
	if (col.gameObject.tag == "Player")
	{		
		GameObject.Destroy(blink);
		GameObject.Destroy(wall);
		touched = true;	
	}
}


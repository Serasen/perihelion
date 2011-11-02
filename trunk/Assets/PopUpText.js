var textField: GameObject;
private var dial : GameObject;
private var text = false;

function Start()
{
	dial = textField;
	dial.renderer.material.color = Color.red;
}

function OnTriggerEnter( coll : Collider)
{
	if (coll.gameObject.tag == "Player")
	{
		Debug.Log("Coll Enter");
		if(text == false)
		{
			dial.gameObject.active = true;
			text = true;
		}
		
	}
 
}



function OnTriggerExit( coll : Collider)
{
	if (coll.gameObject.tag == "Player")
	{
		Debug.Log("Coll Exit");
		dial.gameObject.active = false;
	}

}

var textField: GameObject;
private var text = false;

function Start()
{
	textField.active = false;
}

function OnTriggerEnter( coll : Collider)
{
	if (coll.name == "Player")
	{
		textField.active = true;
		textField.renderer.material.color = Color.blue;
		
	}
 
}


function OnTriggerExit( coll : Collider)
{
	if (coll.name == "Player")
	{
		textField.active = false;
	}

}

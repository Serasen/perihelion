var respawnPoint : GameObject;
private var target : GameObject;


function Awake()
{
	target = GameObject.Find("Player");
}


function OnTriggerExit(col : Collider)
{
	if(col.gameObject.name == "Player")
	{
		target.transform.position = respawnPoint.transform.position;
		target.transform.rotation = respawnPoint.transform.rotation;
		target.rigidbody.velocity = Vector3.zero;
	}


}

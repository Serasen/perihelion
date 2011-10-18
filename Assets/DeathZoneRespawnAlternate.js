var spawnName : String;
var reSpawnEffect : GameObject;

function OnTriggerEnter(col : Collider)
{
	if (col.gameObject.tag == "Player")
	{
		var spawn = GameObject.Find(spawnName);
		
		col.gameObject.transform.position = spawn.transform.position;
		col.gameObject.rigidbody.velocity = Vector3.zero;
		//Camera.mainCamera.transform.position = spawn.transform.position;
		Instantiate(reSpawnEffect,spawn.transform.position, spawn.transform.rotation);

	}


}
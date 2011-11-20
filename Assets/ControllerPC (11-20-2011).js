public var moveSpeed = 10;
public var rotationSpeed = 150;
public var jumpHeight = 10;
public var gravity = 9.8;

private var jump : int;
private var slide : int;
private var grounded = false;
private var coll : Collision;
private var cpDistance : float;

function Start ()
{
	rigidbody.freezeRotation = true;
	slide = rigidbody.mass * moveSpeed * 100;
}


function Update () 
{
	// rotation of player
	transform.Rotate(Vector3(0, 0, (Input.GetAxis("Horizontal") * rotationSpeed * Time.deltaTime)), Space.World);
	
	// on ground
	if (grounded)
	{
		// get angle difference between collided object and player
		var angle = (transform.eulerAngles.z - coll.transform.eulerAngles.z);
		
		if (angle >= 270)
		{
			angle = (angle - 360);
		}
		
		if (angle > 90 && angle < 270)
		{
			angle = (angle - 180);
		}
		
		// adds force to player to give allusion of sliding.  Dead zone of +- 5 degrees
		if ((angle > 5 && angle < 40) || (angle < -5 && angle > -40))
		{
			rigidbody.AddForce(transform.forward * slide * angle, ForceMode.Force);
		}
		
		// jumping
		if (Input.GetKeyDown(KeyCode.Space))
		{
			//rigidbody.velocity = (transform.up * jumpHeight) + (rigidbody.velocity); // jumpHeight = 11 for average jump
			rigidbody.velocity += (transform.position - coll.collider.ClosestPointOnBounds(transform.position)).normalized * jumpHeight;
		}			
	}
	
	// if have collided, get distance between collider object and player object
	if (coll != null)
	{
		cpDistance = Vector3.Distance(transform.position, coll.collider.ClosestPointOnBounds(transform.position));		
	}
	
	// grounded test
	if (cpDistance < 1 && coll != null && Physics.Raycast(transform.position, -transform.up, 1.5))
	{
		grounded = true;
	}
	else
	{
		grounded = false;
	}
}

// adjust world gravity with player direction
function FixedUpdate ()
{
	Physics.gravity = -gameObject.transform.up * gravity;
}

// set collider object variable
function OnCollisionEnter (col : Collision)
{
	coll = col;
}
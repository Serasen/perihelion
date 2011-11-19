

//var slideSpeed;									// controls force multiplier on rigidbody
var rotateSpeed;									// controls rotation multiplier on transform
var jumpPower;									// controls jump multiplier
var gravity;										// gravity value in m/s/s
private var currentRotation : float = 0;	// current rotation in euler angle degrees
private var grounded = false;				// state variable, is on ground?
private var coll : Collision;					// global collision object to pass angle values
private var slideModifier: int;					// used to double effect of gravity while grounded for more slidyness



function Start()
{
	rigidbody.freezeRotation = true;				// freeze object rotatio	
	rigidbody.useGravity = false; 					// turn off physics engine gravity
	gravity = 9.8 * rigidbody.mass;				// set gravity force
	jumpPower = 5;					// set jump height force value
	rotateSpeed = 150;								// rotation speed multiplier
	//slideSpeed = rigidbody.mass;						// slide speed multiplier
	slideModifier = 1;
}


// updates every frame
function Update()
{
	// rotate transform variable degrees every frame on z-axis with value in z-axis of Vector3
	transform.Rotate(Vector3(0,0,Time.deltaTime*Input.GetAxis("Horizontal") * rotateSpeed), Space.World);
	
	// if contact with object labeled as ground	
	if (grounded)
	{
		// if press jump button
		if (Input.GetButton("Jump"))
		{
			var surfaceNormal = (transform.position - 
							coll.collider.ClosestPointOnBounds(transform.position)).normalized;
			rigidbody.velocity = surfaceNormal * jumpPower;
		}	

	/*	
		// get angle difference between object and floor
		var angle = (transform.eulerAngles.z - coll.transform.eulerAngles.z);
		
		// set appropriate agular value between -90 and 90 (even if upside down or on walls
		if (angle >= 270)
		{
			angle = (angle - 360);
		}
		if (90 < angle && angle < 270)
		{
			angle = (angle - 180);
		}

		// if within range of degrees of tilt that a horizontal force is wanted
		if ((angle >5 && angle < 40) || (angle < -5 && angle > -40))
		{
			var test = (transform.right * slideSpeed * angle);
			// add horizontal force (simulated sliding)
			rigidbody.AddForce(transform.right * slideSpeed * angle, ForceMode.Force);
		
		
		}
		// debug log print values
		print("Euler Difference in Degrees: " + angle);
		print("Force vector: " + test);
	*/
	}
	
	
}

// physics update every frame
function FixedUpdate()
{
	//gravity
	gameObject.rigidbody.AddForce(-(gameObject.transform.up) * gravity * slideModifier);
}

//if collider is in contact with another collider
function OnCollisionStay(col : Collision)
{
	grounded = true;
	coll = col;
	slideModifier = 2;
}

// if collider exits another collider
function OnCollisionExit(col : Collision)
{
	// set grounded to false
	grounded = false;
	slideModifier = 1;
}
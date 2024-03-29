/*

// ***************************************************************************
// *	CONTROLLER THAT WORKS WITH ANDROID PUBLISHING LICENSE	*
// *	PLEASE REMEMBER TO COMMENT BACK OUT BEFORE COMMITTING	*
// *	FOR THOSE WITHOUT SAID LICENSE										*
// ***************************************************************************


// Input from player
var moveTouchPad : Joystick;				// Onscreen touch pad for movement
var jumpTouchPad : Joystick;				// On screen touch pad for action

var moveSpeed : int = 2;					// controls force multiplier on rigidbody
var rotationSpeed = 10;						// controls rotation multiplier on transform
var jumpHeight = 2.0;						// controls jump multiplier
var environmentGravity = 9.8;				// gravity value in m/s/s
private var jumpPower : float;				// jump force value
private var currentRotation : float = 0;	// current rotation in euler angle degrees
private var grounded = false;				// state variable, is on ground?
private var rotateSpeed = 0;				// rotate speed calculated with one order of magnitude
private var slideSpeed : int = 0;			// move speed calculated with object mass
private var gravity : float = 0;			// calculated force of gravity with object mass
private var coll : Collision;				// global collision object to pass angle values



function Start()
{
	rigidbody.freezeRotation = true;				// freeze object rotatio	
	rigidbody.useGravity = false; 					// turn off physics engine gravity
	gravity = environmentGravity * rigidbody.mass;	// set gravity force
	jumpPower = (jumpHeight) * (gravity) * 4;		// set jump height force value
	rotateSpeed = rotationSpeed * 10;				// rotation speed multiplier
	slideSpeed = moveSpeed * rigidbody.mass * 100;	// slide speed multiplier
}


// updates every frame
function Update()
{
	// rotate transform variable degrees every frame on z-axis with value in z-axis of Vector3
	transform.Rotate(Vector3(0,0,Time.deltaTime*currentRotation), Space.World);

	
	// positive y direction on movement touch pad (0.0f to 1.0f)
	if ( moveTouchPad.position.y > 0 )
	{		
		// set current rotation speed value with rotate speed multiplier
		currentRotation = (moveTouchPad.position.y * rotateSpeed);
				
	}
	else if (moveTouchPad.position.y < 0) // negative y direction on movement touch pad (0.0f - -1.0f)
	{
		// set current rotation speed value with rotate speed multiplier
		currentRotation = (moveTouchPad.position.y * rotateSpeed);
		
	}
	else // no touch or in dead zone on touch pad
	{	
		// slowly move rotation to zero degrees per frame	
		currentRotation = Mathf.Lerp(currentRotation, 0, Time.time);
	}
	
	// if contact with object labeled as ground
	if (grounded)
	{
		// if press jump button
		if (jumpTouchPad.IsFingerDown())
		{
			// add force to transforms up direction with jumpPower multiplier
			rigidbody.AddForce(transform.up * jumpPower, ForceMode.Force);	
		}
		
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
			var test = (transform.forward * slideSpeed * angle);
			// add horizontal force (simulated sliding)
			rigidbody.AddForce(transform.forward * slideSpeed * angle, ForceMode.Force);
		
		
		}
		// debug log print values
		print("Euler Difference in Degrees: " + angle);
		print("Force vector: " + test);
		
	}
	
	
}

// physics update every frame
function FixedUpdate()
{
	//gravity
	gameObject.rigidbody.AddForce(-(gameObject.transform.up) * gravity);
}

// if collider enters another collider
function OnCollisionEnter(col : Collision)
{
	// if other object has tag "Jumpable"
	if(col.gameObject.tag == "Jumpable")
	{
		// set grounded to true, set it as currently colliding object
		grounded = true;
		coll = col;
		Debug.Log("Player Grounded");
	}
}

// if collider exits another collider
function OnCollisionExit(col : Collision)
{
	// if other object has tag "Jumpable"
	if(col.gameObject.tag == "Jumpable")
	{
		// set grounded to false
		grounded = false;
		Debug.Log("Player Not Grounded");
	}
}


*/

// Input from player
var moveTouchPad : Joystick;
var jumpTouchPad : Joystick;

var moveSpeed : int = 2;
var rotationSpeed = 10;
var jumpHeight = 2.0;
var gravity = 9.8;
private var jumpPower : float;
private var currentRotation : float = 0;
private var targetVelocity : Vector3;
private var maxVelocityChange : int = 5;
private var grounded = false;
private var rotateSpeed = 0;



function Awake()
{
	rigidbody.freezeRotation = true;
	rigidbody.useGravity = false; 
	gravity = gravity * rigidbody.mass;
	jumpPower = (jumpHeight * 4) * (gravity);
	rotateSpeed = rotationSpeed * 10;
}





function Update()
{

	//transform.eulerAngles.z = Mathf.SmoothDampAngle(transform.eulerAngles.z,currentRotation, velY, 1);
	
	//gameObject.transform.localRotation.z = (Mathf.SmoothDampAngle(transform.localRotation.z,currentRotation, transform.localRotation.z, 0.5));
	
	transform.Rotate(Vector3(0,0,Time.deltaTime*currentRotation), Space.World);

	//var temp = transform.localRotation.z;
	
		// Apply movement from move joystick
	if ( moveTouchPad.position.y > 0 )
	{		
		currentRotation = (moveTouchPad.position.y * rotateSpeed);
				
	}
	else if (moveTouchPad.position.y < 0)
	{
		currentRotation = (moveTouchPad.position.y * rotateSpeed);
		
	}
	else
	{		
		currentRotation = Mathf.Lerp(currentRotation, 0, Time.time);
	}
	
	
	if (grounded)
	{
	
	// Apply movement from move joystick
		if ( moveTouchPad.position.y > 0 )
		{
			// get touch pad values, convert into Vector3 on x-axis with value clamped between 0 and maxVelocityChange
			targetVelocity = Vector3(Mathf.Clamp((rigidbody.velocity.x + moveTouchPad.position.y), 0, maxVelocityChange), 0, 0);			
			
			//change velocity on x-axis -- lerp slowly increases value of velocity over time with % multiplier moveSpeed
			//rigidbody.velocity.x = (Mathf.Lerp (rigidbody.velocity.x, maxVelocityChange, Time.fixedDeltaTime * moveSpeed));
			//rigidbody.AddForce(transform.forward * Mathf.Lerp (rigidbody.velocity.x, -maxVelocityChange, Time.fixedDeltaTime * moveSpeed));
			rigidbody.AddForce(transform.forward * moveSpeed);
		}
		if (moveTouchPad.position.y < 0)
		{
			// get touch pad values, convert into Vector3 on x-axis with value clamped between 0 and negative maxVelocityChange
			targetVelocity = Vector3(Mathf.Clamp((rigidbody.velocity.x + moveTouchPad.position.y), -maxVelocityChange, 0), 0, 0);
			
			//change velocity on x-axis -- lerp slowly increases value of velocity over time with % multiplier moveSpeed
			//rigidbody.velocity.x = (Mathf.Lerp (rigidbody.velocity.x, -maxVelocityChange, Time.fixedDeltaTime * moveSpeed));
			rigidbody.AddForce(-transform.forward * moveSpeed);
		}
		
	}
	
	
}

function FixedUpdate()
{
	gameObject.rigidbody.AddForce(-(gameObject.transform.up) * gravity);
}


function OnCollisionEnter(col : Collision)
{
	if(col.gameObject.tag == "Jumpable")
	{
		grounded = true;
		Debug.Log("Player Grounded");
	}
}

function OnCollisionExit(col : Collision)
{
	if(col.gameObject.tag == "Jumpable")
	{
		grounded = false;
		Debug.Log("Player Not Grounded");
	}
}





// Input from player
var moveTouchPad : Joystick;
var jumpTouchPad : Joystick;
var thirdButton : Joystick;


// Movement/Jumping
var moveSpeed = 2.0;
var inAirMultiplier = 0.2;
var jumpHeight = 2.0;
var gravity = 9.8;
var maxVelocityChange = 10.0;
var buttonControlGravity = true;



private var time : float;
private var rotationSpeed = 0;
private var flip = false;
private var rotate : boolean;
private var distanceToCeiling : float;
private var touch : boolean;
private var jumpPower : float;
private var targetVelocity : Vector3;
private var interactingObject : GameObject;
private var interactBuffer = 0;
private var jumpVelocity : float;




// current player states
private var grounded = false;
var jumpEnabled = true;
private var jumping = false;
private var inGravSwitch = false;
private var upsideDown = false;
private var carrying = false;


@script RequireComponent(Rigidbody, CapsuleCollider)

function Awake()
{
	rigidbody.freezeRotation = true;
	rigidbody.useGravity = false; 
	gravity = gravity * rigidbody.mass;
	jumpPower = (jumpHeight * 4) * (gravity);
}



// invert gravity of player
function gravitySwitch()
{
	// gravity value change
	gravity = -(gravity);
	// jump invesion
	jumpPower = -(jumpPower);
	// indicate that currently in gravitySwitch
	inGravSwitch = true;

}


function Update () 
{	
	

	if(carrying)
	{
	
		interactingObject.rigidbody.position = interactObjectDirection();
		interactingObject.rigidbody.rotation = gameObject.rigidbody.rotation;
			
	}
	
	if (buttonControlGravity)
	{
	
		// flip gravity button press -- not possible to switch while currently in switch process
		if (thirdButton.IsFingerDown() && !inGravSwitch)
		{	
			
			// initiate player rotation
			flip = true;	
				
			// initiate gravity switch
			gravitySwitch();		
			
		}
		
		if(inGravSwitch)
		{
		
			if (flip)
			{
				// cast ray to ceiling to get distance
				var hit : RaycastHit;
				if (Physics.Raycast (transform.position, transform.up, hit)) 
				{
					// ceiling distance
					distanceToCeiling = hit.distance;
				
					// player current velocity in y-axis
					var yVel = rigidbody.velocity.y;
			
					// gets time to reach surface if right side up or up side down.
					if (!upsideDown)
					{
						// right side up time equation with yVel subtracted
						time = ((Mathf.Sqrt(2*distanceToCeiling * 9.8 + (yVel * yVel)) - yVel)/9.8);
						// ratio to get full 180 degree spin over the time to reach surface
						rotationSpeed = 185/time;
						// set to upside down
						upsideDown = true;
					}
					else
					{
						// up side down equation with yVel added
						time = ((Mathf.Sqrt(2*distanceToCeiling * 9.8 + (yVel * yVel)) + yVel)/9.8);
						// ratio to get full 180 degree spin over the time to reach surface
						rotationSpeed = 185/time; // 150 was old number
						// set to right side up
						upsideDown = false;
					}
				
				}
				else
				{
					// if no ceiling hit... no rotation rotationSpeed
					rotationSpeed = 0;
				}
			
				// done flipping, set to false
				flip = false;
			
			
			}
		
		
			// rotate transform around x-axis at corrected rotationSpeed with framerate-time correction
			transform.Rotate((Time.deltaTime * rotationSpeed), 0, 0);
			
			//rigidbody.velocity.x = (Mathf.Lerp (rigidbody.velocity.x, 0, Time.fixedDeltaTime * 0.5));
		
		}
	}
		
	
	
}






function FixedUpdate()
{
	
	//see if on ground
	testGrounded();
	
	
	// While on ground
	if (grounded)
	{
		
		// Apply movement from move joystick
		if ( moveTouchPad.position.x > 0 )
		{
			// get touch pad values, convert into Vector3 on x-axis with value clamped between 0 and maxVelocityChange
			targetVelocity = Vector3(Mathf.Clamp((rigidbody.velocity.x + moveTouchPad.position.x), 0, maxVelocityChange), 0, 0);			
			
			//change velocity on x-axis -- lerp slowly increases value of velocity over time with % multiplier moveSpeed
			rigidbody.velocity.x = (Mathf.Lerp (rigidbody.velocity.x, maxVelocityChange, Time.fixedDeltaTime * moveSpeed));
			
			
		}
		else if (moveTouchPad.position.x < 0)
		{
			// get touch pad values, convert into Vector3 on x-axis with value clamped between 0 and negative maxVelocityChange
			targetVelocity = Vector3(Mathf.Clamp((rigidbody.velocity.x + moveTouchPad.position.x), -maxVelocityChange, 0), 0, 0);
			
			//change velocity on x-axis -- lerp slowly increases value of velocity over time with % multiplier moveSpeed
			rigidbody.velocity.x = (Mathf.Lerp (rigidbody.velocity.x, -maxVelocityChange, Time.fixedDeltaTime * moveSpeed));
						

		}
		else
		{		
			// if not going anywhere, slowly bring velocity to zero... essentially drag
			rigidbody.velocity.x = (Mathf.Lerp (rigidbody.velocity.x, 0, Time.fixedDeltaTime));//------------------------------Time.fixedDeltaTime
		}
		
			// Jump

	if (jumpTouchPad.IsFingerDown() && jumpEnabled)
	{
		//rigidbody.velocity.y = jumpPower;
		rigidbody.AddForce(Vector3(0,jumpPower, 0));
		
		// set slower velocitymax for in air
		jumpVelocity = rigidbody.velocity.x * 0.8;
		
		// allow for a small increase in velocity while in air if currently moving slowly
		if (jumpVelocity > 0 && jumpVelocity < 2 )
		{
			jumpVelocity = 3;
		}
		if (jumpVelocity < 0 && jumpVelocity > -2 )
		{
			jumpVelocity = -3;
		}
		
	}
	
	}
	
	//While in air
	if (!grounded)
	{
	
		// Apply movement from move joystick dumbed down for in air movement
		if (moveTouchPad.position.x > 0 )
		{
			
			// get touch pad values, conver into Vector3 on x-axis with value clamped between 0 and maxVelocityChange
			targetVelocity = Vector3(Mathf.Clamp((rigidbody.velocity.x + moveTouchPad.position.x ), 0, jumpVelocity), 0, 0);			
			
			//change velocity on x-axis -- lerp slowly increases value of velocity over time with % multiplier moveSpeed * inAirMultiplier
			rigidbody.velocity.x = (Mathf.Lerp (rigidbody.velocity.x, jumpVelocity, Time.fixedDeltaTime * moveSpeed));
			
			
			
		}
		else if (moveTouchPad.position.x < 0)
		{
			
			// get touch pad values, conver into Vector3 on x-axis with value clamped between 0 and negative maxVelocityChange
			targetVelocity = Vector3(Mathf.Clamp((rigidbody.velocity.x + moveTouchPad.position.x), jumpVelocity, 0), 0, 0);
			
			//change velocity on x-axis -- lerp slowly increases value of velocity over time with % multiplier moveSpeed * inAirMultiplier
			rigidbody.velocity.x = (Mathf.Lerp (rigidbody.velocity.x, jumpVelocity, Time.fixedDeltaTime * moveSpeed));
			
		}

	
	}
	

	
	// manually add gravity force
		
	rigidbody.AddForce(Vector3(0, -gravity /* * rigidbody.mass*/, 0));
	
	
	
}


function testGrounded()
{
	// cast ray to floor to get distance
		var hit : RaycastHit;
		var distanceToFloor : float;
		if (Physics.Raycast(transform.position, -transform.up, hit)) 
		{
			// floor distance
			distanceToFloor = hit.distance;
		}
		
		if(distanceToFloor < 1.1)
		{
			grounded = true;
		}
		else
		{
			grounded = false;
		}

}



function OnCollisionEnter(collider: Collision)
{



	// control of gravity switch collision only
	if (inGravSwitch && collider.gameObject.tag  == "Platform")
	{
		// stop rotation
		rotationSpeed = 0;
		 
		// set player to y-axis normal if rotation was off by a few degrees
		if (!upsideDown)
		{
			transform.localRotation.x = 0;	
		}
		else
		{
			transform.localRotation.x = 180;
		}
		// done gravity switch, set to false
		inGravSwitch = false;

	}
	

}

function OnTriggerStay(collider : Collider)
{
	if (!buttonControlGravity && collider.gameObject.tag == "Interactable")
	{		
		interact(collider.gameObject);
	}
	

}


function interact(col : GameObject)
{
	if(thirdButton.IsFingerDown() && !carrying && (Time.time - interactBuffer) > 1)
	{
		interactBuffer = Time.time;
		interactingObject = col.gameObject.transform.parent.gameObject;
		//interactingObject.transform.position = gameObject.transform.position + Vector3(1, .5, 0);
		carrying = true;
		return;
	}

	if (thirdButton.IsFingerDown() && carrying && (Time.time - interactBuffer) > 1)
	{
		interactBuffer = Time.time;
		carrying = false;
		interactingObject.rigidbody.velocity = gameObject.rigidbody.velocity + Vector3(1,0,0);
		interactingObject = null;	
	}	
}

function interactObjectDirection() : Vector3
{
	var temp : Vector3;
	if (moveTouchPad.position.x > 0 )
		{
			temp = gameObject.transform.localPosition + Vector3(1, .5, 0);			
			return(temp);			
		}
		else if (moveTouchPad.position.x < 0)
		{
			temp = gameObject.transform.localPosition + Vector3(-1, .5, 0);			
			return(temp);
		}
		else
		{
			temp = gameObject.transform.localPosition + Vector3(0, 1.5, 0);	
			return(temp);
		}

	



}

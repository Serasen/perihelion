
// Input from player
var moveTouchPad : Joystick;
var jumpTouchPad : Joystick;
var thirdButton : Joystick;


var rotationSpeed = 5.0;
var jumpHeight = 2.0;
var gravity = 9.8;
private var jumpPower : float;
private var currentRotation : float = 0;


function Awake()
{
	rigidbody.freezeRotation = true;
	rigidbody.useGravity = false; 
	gravity = gravity * rigidbody.mass;
	jumpPower = (jumpHeight * 4) * (gravity);
}





function Update()
{

	transform.localRotation.z = currentRotation;
}








function FixedUpdate()
{


	// Apply movement from move joystick
	if ( moveTouchPad.position.y > 0 )
	{
		
		currentRotation = transform.localRotation.z + (moveTouchpad.position.y * rotationSpeed);
		
	}
	else if (moveTouchPad.position.y < 0)
	{
		currentRotation = transform.localRotation.z - (moveTouchpad.position.y * rotationSpeed);	

	}
	else
	{		
		currentRotation = transform.localRotation.z;
	}
		
	
	// Jump
	if (jumpTouchPad.IsFingerDown() && jumpEnabled)
	{
		//rigidbody.velocity.y = jumpPower;
		rigidbody.AddForce(transform.up * jumpPower);
		
	}	





}
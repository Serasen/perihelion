
#pragma strict

var target : Transform;
var smoothTime = 0.3;

private var thisTransform : Transform;
private var velocity : Vector2;
private var zero = 0.0;

function Start()
{
	thisTransform = transform;
}

function Update() 
{
	thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, target.position.x, velocity.x, smoothTime);
	thisTransform.position.y = Mathf.SmoothDamp( thisTransform.position.y, target.position.y, velocity.y, smoothTime);
	
	var temp = target.transform.up;
	thisTransform.up = temp;
}
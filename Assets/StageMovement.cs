using UnityEngine;
using System.Collections;

public class StageMovement : MonoBehaviour {
	public float rotateSpeed;
	
	//public Transform rotatePoint;
	
	/*
	****FOR MOVING LEFT/RIGHT IF WE DECIDE TO IMPLEMENT****
	//public float moveSpeed;
	//private CharacterController stage;
	//public Transform cam;
	//public float startingOrientation;
	*/

	// Use this for initialization
	void Start () {
		rotateSpeed = 100;
		//moveSpeed = 3;		
		//stage = GetComponent<CharacterController>();
	}
	
	// Update is called once per frame
	void Update () {
		//Rotate with Up/Down
		transform.RotateAround(transform.position, Vector3.forward * Input.GetAxis("Vertical"), rotateSpeed * Time.deltaTime);
		
		/*
		if(Input.GetButton("Turn"))
			StartCoroutine("TwiStCoroutine", 1);
		*/
		
		// Left and right movement
		//stage.Move(Vector3.right * moveSpeed * Input.GetAxis("Horizontal") * Time.deltaTime * -1);
		//cam.Translate(Vector3.right * moveSpeed * Input.GetAxis("Horizontal") * Time.deltaTime * -1);
		

	}
	
	/*
	****OPTION FOR ROTATING 90 DEGREES AT A TIME****
	
	IEnumerator TwiStCoroutine(int direction) {
		
		startingOrientation = transform.rotation.z;
		if(transform.rotation.z == 0)
			transform.RotateAround(transform.position, Vector3.forward * -1, 10 * Time.deltaTime);
		
		
		while(transform.rotation.z > (startingOrientation + 270) % 360) {
			yield return null;
			transform.RotateAround(transform.position, Vector3.forward * -1, rotateSpeed * Time.deltaTime);
		}
	}
	*/
}

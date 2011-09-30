using UnityEngine;
using System.Collections;

public class Jumping : MonoBehaviour {
	public bool grounded;
	public float fallSpeed;	
	public float jumpSpeed;
	private Vector3 jumpVector;
	private float startingZ;
	private Rigidbody rb;
	private Quaternion zero;
	
	// Use this for initialization
	void Start () {
		fallSpeed = 3;
		jumpSpeed = 3;
		jumpVector = new Vector3(0,jumpSpeed,0);
		startingZ = transform.position.z;
		rb = GetComponent<Rigidbody>();
		zero = new Quaternion(0,0,0,0);
	}
	
	// Update is called once per frame
	void Update () {		
		//Keep the character from spinning or moving towards/away
		transform.rotation = zero;
		transform.Translate(0,0,startingZ - transform.position.z);
		
		//Jump
		if(Input.GetButton("Fire1") && grounded)
			rb.velocity = jumpVector;
	}
	
	//These two prevent double, triple ... infinity jumping
	void OnCollisionEnter(Collision c) {
		grounded = true;
	}
	
	void OnCollisionExit(Collision c) {
		grounded = false;
	}
}

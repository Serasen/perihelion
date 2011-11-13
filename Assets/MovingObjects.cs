using UnityEngine;
using System.Collections;

public class MovingObjects : MonoBehaviour {
	public Transform playerPosition;
	private float gravity;
	
	// Use this for initialization
	void Start () {
		gravity = 9.8f*rigidbody.mass;
	}
	
	// Update is called once per frame
	void FixedUpdate () {
		rigidbody.AddForce(playerPosition.up*-1*gravity);
	}
}

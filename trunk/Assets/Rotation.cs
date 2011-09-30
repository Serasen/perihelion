using UnityEngine;
using System.Collections;

public class Rotation : MonoBehaviour {
	public float rotateSpeed;

	// Use this for initialization
	void Start () {
		rotateSpeed = 100;
	
	}
	
	// Update is called once per frame
	void FixedUpdate () {
		transform.RotateAround(transform.position, Vector3.forward * Input.GetAxis("Vertical"), rotateSpeed * Time.deltaTime);
	}
}

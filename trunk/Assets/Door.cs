using UnityEngine;
using System.Collections;

public class Door : MonoBehaviour {
	GameObject levelManager;
	LevelManager lmScript;
	public int totalLevels;

	// Use this for initialization
	void Start () {
		levelManager = GameObject.Find("LevelManager");
		if (levelManager != null) {
			lmScript = levelManager.GetComponent<LevelManager>();
		}
		totalLevels = lmScript.getNumLevels();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnTriggerEnter(Collider c) {
		// Mark the level as completed in a bool array
		lmScript.checkLevel();
		// Load the next level, or the first if you are at the end. This loop structure is temporary.
		Application.LoadLevel((Application.loadedLevel + 1) % totalLevels);
	}
}

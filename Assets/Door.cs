using UnityEngine;
using System.Collections;

public class Door : MonoBehaviour {

	// Use this for initialization
	void Start () {
		GameObject levelManager = GameObject.Find("LevelManager");
		if (levelManager != null) {
			LevelManager lmScript = levelManager.GetComponent<LevelManager>();
			lmScript.bumpLevels();
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnTriggerEnter(Collider c) {
		if(Application.loadedLevel == 0)
			Application.LoadLevel(Application.loadedLevel + 1);
		else
			Application.LoadLevel(0);
	}
}

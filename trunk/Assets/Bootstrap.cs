using UnityEngine;
using System.Collections;

public class Bootstrap : MonoBehaviour {
	// This should point to a Prefab LevelManager object.
	public GameObject prefabLM;

	void Awake () {
		// sigh... Instantiate appends (Clone) to any object created...
		// So need to rename it without the Clone.
		// Anyway... check for existance of a LevelManager, and if none,
		// create one, and make it Immortal...
		GameObject tmp = GameObject.Find("LevelManager");
		if (tmp == null) {
			GameObject gm = (GameObject) GameObject.Instantiate(prefabLM);
			gm.name = "LevelManager";
			GameObject.DontDestroyOnLoad(gm);
		}

		Destroy(this.gameObject); // Bye, Bye, Bootstrap.
	}
	
} // end class s_bootstrap

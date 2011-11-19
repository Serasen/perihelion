using UnityEngine;
using System.Collections;

public class OptionsMenuGUI : MonoBehaviour {

	// Use this for initialization
	void Start () {
		this.enabled = false;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	void OnGUI() {
		if(GUI.Button (new Rect(10,10,100,50), "Back")) {
			GetComponent<TitleMenuGUI>().enabled = true;
			this.enabled = false;
		}
	}
}

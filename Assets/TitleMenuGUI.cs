using UnityEngine;
using System.Collections;

public class TitleMenuGUI : MonoBehaviour {
	public Texture2D backdrop;
	public Texture2D titleText;
	public Texture2D play;
	public Texture2D options;
	public Texture2D exit;
	public AudioClip titleTrack;
	public float buttonWidth;
	public float buttonHeight;
	public float padding;
	
	// Use this for initialization
	void Start () {
		buttonWidth = 200;
		buttonHeight = 60;
		padding = 5;
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnGUI() {
		if(GUI.Button (new Rect(Screen.width/2 - buttonWidth/2,Screen.height/2.1F,buttonWidth,buttonHeight), "Play")) {
			Application.LoadLevel(1);
		}
		if(GUI.Button (new Rect(Screen.width/2 - buttonWidth/2,Screen.height/2.1F + buttonHeight + padding,buttonWidth,buttonHeight), "Options")) {
			GetComponent<OptionsMenuGUI>().enabled = true;
			this.enabled = false;
		}
		if(GUI.Button (new Rect(Screen.width/2 - buttonWidth/2,Screen.height/2.1F + buttonHeight * 2 + padding*2,buttonWidth,buttonHeight), "Exit")) {
			
		}
	}
}

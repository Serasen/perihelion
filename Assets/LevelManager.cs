using UnityEngine;
using System.Collections;

public class LevelManager : MonoBehaviour {
	public bool[] levelsCompleted;
	private int numOfLevels;
	
	void Awake () {
		numOfLevels = 2;
		levelsCompleted = new bool[numOfLevels];
	}
	
	public void checkLevel() {
		levelsCompleted[Application.loadedLevel] = true;
	}
	
	public bool[] getLevels() {
		return levelsCompleted;
	}
	
	public int getNumLevels() {
		return numOfLevels;
	}
	

} // end class s_LevelManager

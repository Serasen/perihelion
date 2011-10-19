using UnityEngine;
using System.Collections;

public class LevelManager : MonoBehaviour {

	public int completedLevels = 0;
	public int redDoors = 0;
	
	void Start () {
	}
	public void bumpLevels() {
		completedLevels++;
	}
	public int getLevels() {
		return completedLevels;
	}
	public void bumpReds() {
		redDoors++;
	}
	
} // end class s_LevelManager

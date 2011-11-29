import System;
//import System.Collections;
import System.Xml;
import System.Xml.Serialization;
import System.IO;
import System.Text;




private var fileLocation : String;
private var fileName : String = "SaveData.xml";
private var myData : UserData;
private var data : String;

private var chapLevel = new int[10, 10];
private var bonusChapLevel = new int[10, 10];

private var soundOnOff : boolean = false;
private var controller : boolean = true;
private var paused : boolean = false;

// chapter selected from chapter select GUI screen
private var chapLevelSelect = 0;


// set sound On/Off variable
function SetSound(t : boolean)
{
	if (t)
	{
		soundOnOff = true;
	}
	else
	{
		soundOnOff = false;
	}
}

function GetSound() : boolean
{
	return (soundOnOff);
}


// set controller Left/Right Variable
function SetController(t : boolean)
{
	if (t)
	{
		controller = true;
	}
	else
	{
		controller = false;
	}
}

function GetController() : boolean
{
	return (controller);
}

// Set chapter selected from chapter selection screen
function SetChapSelect(t : int)
{
	chapLevelSelect = t;
}

// get chapter selected from chapter selection screen
function GetChapSelect() : int
{
	return (chapLevelSelect);
}

// get number of chapters from array
function GetChapLength() : int
{
	var temp = 0;
	for (var i = 0; i < 10; i++)
	{
		if (chapLevel[i,0] == 1)
		{
			temp++;
		}
	}
	
	return (temp);
}

// get number of levels from chapter in array
function GetLevelLength(l : int) : int
{
	var temp = 0;
	Debug.Log("GetLevelLength = " + l);
	for (var i = 0; i < 10; i++)
	{
		if (chapLevel[l,i] == 1)
		{
			Debug.Log("Count");
			temp++;
		}
	}
	
	return (temp);
}

// set chapter and level in array as complete (1) or incomplete (0)
function SetChapLevel(c : int, l : int, d : int)
{
	chapLevel[c,l] = d;
}

// get chapter and level completion status from array
function GetChapLevel(c : int, l : int) : int
{
	return (chapLevel[c,l]);
}

// set bonus chapter and level in bonus array
function SetBonusChapLevel(c : int, l : int, d : int)
{
	bonusChapLevel[c,l] = d;
}

// get bonus chapter and level in bonus array
function GetBonusChapLevel (c : int, l : int) : int
{
	return (bonusChapLevel[c,l]);
}

// set sound On/Off
function Sound (ss : boolean)
{
	if (ss)
	{
		Camera.mainCamera.gameObject.GetComponent(AudioListener).enabled = true;
	}
	else
	{
		Camera.mainCamera.gameObject.GetComponent(AudioListener).enabled = false;
	}
}

// set controller position
function ControllerPosition(ss : boolean)
{
	if (ss)
	{
		//var temp = GameObject.Find("LeftTouchPad").GetComponent(GUITexture);
		var temp1 = GameObject.Find("LeftTouchPad").GetComponent(Joystick);
	/*
		temp.pixelInset.width = Screen.width * 1/10;
		temp.pixelInset.height = Screen.height * 9.5/10;
		temp.pixelInset.x = 0;
		temp.pixelInset.y = Screen.height * 0.25/10;
		*/
		
		temp1.touchZone.x = 0;
		temp1.touchZone.y = Screen.height * 0.25/10;
		temp1.touchZone.width = Screen.width * 1/10;
		temp1.touchZone.height = Screen.height * 9.5/10;
		
		//var temp2 = GameObject.Find("RightTouchPad").GetComponent(GUITexture);
		var temp3 = GameObject.Find("RightTouchPad").GetComponent(Joystick);
		/*
		temp2.pixelInset.width = Screen.width * 2/10;
		temp2.pixelInset.height = Screen.height * 2/10;
		temp2.pixelInset.x = Screen.width * 8/10;
		temp2.pixelInset.y = 0;
		*/
		
		temp3.touchZone.x = Screen.width * 9/10;
		temp3.touchZone.y = Screen.height * 1/10;
		temp3.touchZone.width = Screen.width * 2/10;
		temp3.touchZone.height = Screen.height * 2/10;
		
	}
	else
	{
		//var temp = GameObject.Find("LeftTouchPad").GetComponent(GUITexture);
		var temp4 = GameObject.Find("LeftTouchPad").GetComponent(Joystick);
	/*
		temp.pixelInset.width = Screen.width * 1/10;
		temp.pixelInset.height = Screen.height * 9.5/10;
		temp.pixelInset.x = 0;
		temp.pixelInset.y = Screen.height * 0.25/10;
		*/
		
		temp4.touchZone.x = Screen.width * 8.5/10;
		temp4.touchZone.y = Screen.height * 0.25/10;
		temp4.touchZone.width = Screen.width * 1/10;
		temp4.touchZone.height = Screen.height * 9.5/10;
		
		//var temp2 = GameObject.Find("RightTouchPad").GetComponent(GUITexture);
		var temp5 = GameObject.Find("RightTouchPad").GetComponent(Joystick);
		/*
		temp2.pixelInset.width = Screen.width * 2/10;
		temp2.pixelInset.height = Screen.height * 2/10;
		temp2.pixelInset.x = Screen.width * 8/10;
		temp2.pixelInset.y = 0;
		*/
		
		temp5.touchZone.x = Screen.width * 1/10;
		temp5.touchZone.y = Screen.height * 1/10;
		temp5.touchZone.width = Screen.width * 2/10;
		temp5.touchZone.height = Screen.height * 2/10;	
	}
		
}


class UserData
{
    var chap0 = new int[10];
    var chap1 = new int[10];
    var chap2 = new int[10];
	var chap3 = new int[10];
    var chap4 = new int[10];
    var chap5 = new int[10];
    
	//var bonusChapLevel = new int[10, 10];
	var soundOnOff : boolean;
	var controller : boolean;
}


function SaveData()
{
/*
	SaveArray(myData.chap0, 0);
	SaveArray(myData.chap1, 1);
	SaveArray(myData.chap2, 2);
	SaveArray(myData.chap3, 3);
	SaveArray(myData.chap4, 4);
	SaveArray(myData.chap5, 5);*/
	
	for (var i = 0; i < 10; i++)
	{
		myData.chap0[i] = chapLevel[0,i];
	}
	
	for (var j = 0; j < 10; j++)
	{
		myData.chap1[j] = chapLevel[1,j];
	}
	
	myData.soundOnOff = soundOnOff;
	myData.controller = controller;
	
	data = SerializeObject(myData);	
	CreateXML();
}

function SaveArray(arr : Array, chap : int)
{
	for (var i = 0; i < 10; i++)
	{
		arr[i] = chapLevel[chap,i];
	}
}


function LoadData()
{
	LoadXML();
	
    if(data.ToString() != "")
    {
        myData = DeserializeObject(data);
         
     /*   LoadArray (myData.chap0, 0);
		LoadArray (myData.chap1, 1);
		LoadArray (myData.chap2, 2);
		LoadArray (myData.chap3, 3);
		LoadArray (myData.chap4, 4);
		LoadArray (myData.chap5, 5);*/
		
		for (var j = 0; j < 10; j++)
		{
			chapLevel[0,j] = myData.chap0[j];
		}
	
		for (var i = 0; i < 10; i++)
		{
			chapLevel[1,i] = myData.chap1[i];
		}
		
		
		
		soundOnOff = myData.soundOnOff;
		controller = myData.controller;        
	}	
}

function LoadArray (arr : Array, chap : int)
{
	for (var i = 0; i < 10; i++)
	{
		chapLevel[chap,i] = arr[i];
	}
}

/* The following metods came from the referenced URL */
//string UTF8ByteArrayToString(byte[] characters)
function UTF8ByteArrayToString(characters : byte[] )
{     
   var encoding : UTF8Encoding  = new UTF8Encoding();
   var constructedString : String  = encoding.GetString(characters);
   return (constructedString);
}

//byte[] StringToUTF8ByteArray(string pXmlString)
function StringToUTF8ByteArray(pXmlString : String)
{
   var encoding : UTF8Encoding  = new UTF8Encoding();
   var byteArray : byte[]  = encoding.GetBytes(pXmlString);
   return byteArray;
}
   
   // Here we serialize our UserData object of myData
   //string SerializeObject(object pObject)
function SerializeObject(pObject : Object)
{
   var XmlizedString : String  = null;
   var memoryStream : MemoryStream  = new MemoryStream();
   var xs : XmlSerializer = new XmlSerializer(typeof(UserData));
   var xmlTextWriter : XmlTextWriter  = new XmlTextWriter(memoryStream, Encoding.UTF8);
   xs.Serialize(xmlTextWriter, pObject);
   memoryStream = xmlTextWriter.BaseStream; // (MemoryStream)
   XmlizedString = UTF8ByteArrayToString(memoryStream.ToArray());
   return XmlizedString;
}

   // Here we deserialize it back into its original form
   //object DeserializeObject(string pXmlizedString)
function DeserializeObject(pXmlizedString : String)   
{
   var xs : XmlSerializer  = new XmlSerializer(typeof(UserData));
   var memoryStream : MemoryStream  = new MemoryStream(StringToUTF8ByteArray(pXmlizedString));
   var xmlTextWriter : XmlTextWriter  = new XmlTextWriter(memoryStream, Encoding.UTF8);
   return xs.Deserialize(memoryStream);
}

   // Finally our save and load methods for the file itself
function CreateXML()
{
   var writer : StreamWriter;
   //FileInfo t = new FileInfo(_FileLocation+"\\"+ _FileName);
   var t : FileInfo = new FileInfo(fileLocation+"/"+ fileName);
   if(!t.Exists)
   {
      writer = t.CreateText();
   }
   else
   {
      t.Delete();
      writer = t.CreateText();
   }
   writer.Write(data);
   writer.Close();
}
   
function LoadXML()
{
   //StreamReader r = File.OpenText(_FileLocation+"\\"+ _FileName);
   var r : StreamReader = File.OpenText(fileLocation+"/"+ fileName);
   var _info : String = r.ReadToEnd();
   r.Close();
   data = _info;
}


function Awake()
{
	SetChapLevel(0,0,1);
	
	DontDestroyOnLoad(this.gameObject);
	
	// Where we want to save and load to and from
    fileLocation = Application.persistentDataPath;      
          
    // we need soemthing to store the information into
    myData = new UserData();

	LoadData();
	
}


function OnGUI()
{
	if (paused)
	{
		Time.timeScale = 0;
		
		if (GUI.Button(Rect(Screen.width * 4/10, Screen.height * 3/10, Screen.width * 2/10, Screen.height * 2/10),"Resume"))
		{
			Time.timeScale = 1;
			paused = false;			
		}	
		
		if (GUI.Button(Rect(Screen.width * 4/10, Screen.height * 6/10, Screen.width* 2/10, Screen.height * 2/10),"Exit"))
		{
			// Time.timeScale = 1;
			// paused = false;
			Application.LoadLevel("chapterSelectionScreen");			
		}	
		
	}



}


function Update ()
{
Debug.Log(Application.dataPath);
	if (Input.GetKeyDown(KeyCode.Escape))
	{
		paused = true;	
	}
	
	try
	{
		ControllerPosition(controller);
		throw "";
	}
	catch(err)
	{
		Debug.Log(err);
	}
	
	Sound(soundOnOff);

}


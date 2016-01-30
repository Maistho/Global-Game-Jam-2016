#pragma strict

import UnityStandardAssets.CrossPlatformInput;

var arrowClass : GameObject;

public var speed : float;

var physBody : Rigidbody2D;
function Start () {
	physBody = GetComponent.<Rigidbody2D>();
}

function OnCollisionExit2D(obj: Collision2D) {
	Debug.Log('hej');
}


function Update () {

	//Update movement
	physBody.velocity.x = CrossPlatformInputManager.GetAxis('Horizontal') * speed;
	physBody.velocity.y = CrossPlatformInputManager.GetAxis('Vertical') * speed;
	var rsV = CrossPlatformInputManager.GetAxis('RightStickV');
	var rsH = CrossPlatformInputManager.GetAxis('RightStickH');


	if (Mathf.Abs(rsV) + Mathf.Abs(rsH) > 0.1) { //If we have gamepad input
		var pos = Mathf.Atan2(rsV,rsH) * Mathf.Rad2Deg - 90;
		transform.rotation = Quaternion.Euler(0,0,pos);

	} else {//use mouse input
		var mousePosition = Camera.main.ScreenToWorldPoint(CrossPlatformInputManager.mousePosition);
		transform.rotation = Quaternion.LookRotation(transform.position - mousePosition, Vector3.forward);
	}	

	//Remove all rotations that are not in z-axis
	transform.eulerAngles = new Vector3(0, 0, transform.eulerAngles.z);
	physBody.angularVelocity = 0;


	//Shoot
	if (CrossPlatformInputManager.GetButtonDown('Fire1')) {
		var arrow = Instantiate(arrowClass, transform.position, transform.rotation);
	}
}
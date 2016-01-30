#pragma strict

import UnityStandardAssets.CrossPlatformInput;
var physBody : Rigidbody2D;
function Start () {
	physBody = GetComponent.<Rigidbody2D>();
}

function Update () {

	physBody.velocity.x = CrossPlatformInputManager.GetAxis('Horizontal') * 10;
	physBody.velocity.y = CrossPlatformInputManager.GetAxis('Vertical') * 10;
	var rsV = CrossPlatformInputManager.GetAxis('RightStickV');
	var rsH = CrossPlatformInputManager.GetAxis('RightStickH');


	if (Mathf.Abs(rsV) + Mathf.Abs(rsH) > 0.1) { //If we have gamepad input
		var pos = Mathf.Atan2(rsV,rsH) * Mathf.Rad2Deg - 90;
		transform.rotation = Quaternion.Euler(0,0,pos);

	} else { //use mouse input
		var mousePosition = Camera.main.ScreenToWorldPoint(CrossPlatformInputManager.mousePosition);
		transform.rotation = Quaternion.LookRotation(transform.position - mousePosition, Vector3.forward);
	}

	//Remove all rotations that are not in z-axis
	transform.eulerAngles = new Vector3(0, 0, transform.eulerAngles.z);
	physBody.angularVelocity = 0;
}
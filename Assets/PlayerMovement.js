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


	if (rsV || rsH) {
		var pos = Mathf.Atan2(rsV,rsH) * Mathf.Rad2Deg - 90;
		Debug.Log(pos);
		transform.rotation = Quaternion.Euler(0,0,pos);
	} else {
		var mousePosition = Camera.main.ScreenToWorldPoint(CrossPlatformInputManager.mousePosition);
		Debug.Log(mousePosition);
		transform.rotation = Quaternion.LookRotation(transform.position - mousePosition, Vector3.forward);
	}

	transform.eulerAngles = new Vector3(0, 0, transform.eulerAngles.z);
	physBody.angularVelocity = 0;
}
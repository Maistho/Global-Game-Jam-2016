#pragma strict

public var speed : float;
var rb : Rigidbody2D;
function Start () {
	rb = GetComponent.<Rigidbody2D>();
	rb.velocity = transform.up * speed;
}

function Update () {

}
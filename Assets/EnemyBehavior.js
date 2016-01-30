#pragma strict

public var speed : float = 6f;
var rb : Rigidbody2D;
function Start () {
	rb = GetComponent.<Rigidbody2D>();
	rb.velocity = transform.up;

}

function OnBecameInvisible() {
	Destroy(gameObject);
}

function OnTriggerEnter2D(obj: Collider2D) {
	var name = obj.gameObject.name;
	if (name == "Spawn") {
		Destroy(gameObject);
		Debug.Log('You lose some points');
	}
}

function Update () {

}
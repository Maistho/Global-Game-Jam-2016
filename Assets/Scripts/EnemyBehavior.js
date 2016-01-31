#pragma strict

public var speed : float = 6f;
public var health : int = 10;
var powerUp : GameObject;
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
	switch (name) {
		case 'Spawn':
			Destroy(gameObject);
			Debug.Log('You lose some points');
			health -= 1;
			if (health == 0) {
			    Debug.Log('You lose the game');
			}
			break;
		case 'Arrow(Clone)':
			if (Random.value > 0.6) {
				Instantiate(powerUp, transform.position, Quaternion.identity);
			}
		Destroy(gameObject);
		Destroy(obj.gameObject);
		break;
	}
}

function Update () {

}
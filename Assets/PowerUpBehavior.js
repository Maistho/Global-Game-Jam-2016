#pragma strict

var types : String[] = ['red', 'green', 'blue'];
var type : String;
function Start () {
	type = types[Random.Range(0, types.length)];

	var sp = GetComponent.<SpriteRenderer>();

	switch (type) {
		case 'red':
			sp.color = Color.red;
			break;
		case 'green':
			sp.color = Color.green;
			break;
		case 'blue':
			sp.color = Color.blue;
			break;
		default:
			sp.color = Color.magenta;
	}
}
function getType() {
	return type;
}
function Update () {

}
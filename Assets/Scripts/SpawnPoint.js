#pragma strict

var didSpawn = false;
public var Enemy : GameObject;

function Awake () {
	InvokeRepeating('spawnEnemy', 2, 1);
}

function circlePosition(radius : float) : Vector3 {
	var rot = Random.Range(0f,2*Mathf.PI);
	var v = new Vector3(Mathf.Sin(rot)*radius, Mathf.Cos(rot)*radius, 0);
	return v;
}

function spawnEnemy() {
	var pos = circlePosition(3);
	var enemy = Instantiate(Enemy, transform.position + pos, Quaternion.FromToRotation(pos.up, transform.position - pos));
	Debug.Log(enemy);
}
function Start () {


}

function Update () {

}
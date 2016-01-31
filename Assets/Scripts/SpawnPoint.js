#pragma strict

var didSpawn = false;
public var Enemy : GameObject;
public var health : float = 5f;
public var maxHealth : float = 5f;
private var healthBar : UnityEngine.UI.Image;

function Awake () {
	InvokeRepeating('spawnEnemy', 2, 1);
}

function circlePosition(radius : float) : Vector3 {
	var rot = Random.Range(0f,2*Mathf.PI);
	var v = new Vector3(Mathf.Sin(rot)*radius, Mathf.Cos(rot)*radius, 0);
	return v;
}

function OnTriggerEnter2D(obj: Collider2D) {
    var name = obj.gameObject.name;
    switch (name) {
        case 'Enemy(Clone)':
            health -= 1;
            Debug.Log(health);
            healthBar.fillAmount = health / maxHealth;
    }
    if (health == 0) {
        Debug.Log('You lose the game');
    }
}

function spawnEnemy() {
	var pos = circlePosition(3);
	var enemy = Instantiate(Enemy, transform.position + pos, Quaternion.FromToRotation(pos.up, transform.position - pos));
	Debug.Log(enemy);
}
function Start () {
    healthBar = transform.FindChild("baseCanvas").FindChild("healthBG").FindChild("healthBar").GetComponent.<UnityEngine.UI.Image>();
}

function Update () {

}
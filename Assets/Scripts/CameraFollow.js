#pragma strict

var target : Transform;

function Start () {

}

function Update () {
transform.position.x = target.position.x;
transform.position.y = target.position.y;

}
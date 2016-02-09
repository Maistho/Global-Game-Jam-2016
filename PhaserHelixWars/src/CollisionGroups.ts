export class CollisionGroup {
    static Player: Phaser.Physics.P2.CollisionGroup     = new Phaser.Physics.P2.CollisionGroup(Math.pow(2, 1));
    static Enemy: Phaser.Physics.P2.CollisionGroup      = new Phaser.Physics.P2.CollisionGroup(Math.pow(2, 2));
    static Terrain: Phaser.Physics.P2.CollisionGroup    = new Phaser.Physics.P2.CollisionGroup(Math.pow(2, 3));
    static Projectile: Phaser.Physics.P2.CollisionGroup = new Phaser.Physics.P2.CollisionGroup(Math.pow(2, 4));
}
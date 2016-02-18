module Helix {
    export class Bullet extends Phaser.Sprite {
        body: Phaser.Physics.P2.Body;
        constructor(
            game: Phaser.Game,
            x: number,
            y: number,
            rotation: number
        ) {
            super(game, x, y, 'bullet');
            this.anchor.set(0.5, 0.5);
            this.scale.set(0.1)
            game.physics.p2.enable(this);

            this.events.onOutOfBounds.add(() => {
                this.kill()
            }, this);

            this.body.kinematic = true;
            this.body.rotation = rotation;

            let speed = 800;
            this.body.velocity.x = Math.sin(rotation) * speed;
            this.body.velocity.y = Math.cos(rotation) * -speed;

            this.body.setCollisionGroup(game.physics.p2.collisionGroups[CollisionGroup.Projectile]);
            this.body.collides([
                game.physics.p2.collisionGroups[CollisionGroup.Enemy],
                game.physics.p2.collisionGroups[CollisionGroup.Terrain]
            ], (obj1: Phaser.Physics.P2.Body, obj2: Phaser.Physics.P2.Body) => {
                this.kill();
                obj2.sprite.damage(1);
                });
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;

            game.add.existing(this);
        }

    }
}
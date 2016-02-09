import {CollisionGroup} from './CollisionGroups'

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
        this.scale.set(0.2)
        game.physics.p2.enable(this);

        this.events.onOutOfBounds.add(() => {
            this.kill()
        }, this);
       // this.body.kinematic = true;
        //this.body.setCollisionGroup(CollisionGroup.Projectile);
        //this.body.collides([CollisionGroup.Enemy, CollisionGroup.Player]);

        this.body.onBeginContact.add((body, bodyB, shapeA, shapeB, equation) => {
            console.log(body.sprite.key);
        }, this);
        

        game.add.existing(this);
    }

}

import {CollisionGroup} from './CollisionGroups'

export enum EnemyType { Regular, Weird }


export class Enemy extends Phaser.Sprite {
    body: Phaser.Physics.P2.Body;
    constructor(
        game: Phaser.Game,
        x: number,
        y: number,
        rotation: number,
        type: EnemyType
    ) {
        super(game, x, y, EnemyType[type] + 'Enemy');
        this.anchor.set(0.5, 0.4);
        this.scale.set(0.2);
        //this.tint = 0xff00ff;

        game.physics.p2.enable(this);

        this.body.setCollisionGroup(CollisionGroup.Enemy);
        this.body.collides([CollisionGroup.Projectile, CollisionGroup.Enemy, CollisionGroup.Terrain]);

        this.body.setCircle(60, 0, -10);
        this.body.rotation = rotation + Math.PI;
        this.body.thrust(-10000);


        game.add.existing(this);
    }
}
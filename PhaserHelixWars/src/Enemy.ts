module Helix {
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
            this.maxHealth = 2;
            this.health = this.maxHealth;

            game.physics.p2.enable(this);
            this.body.setCircle(60, 0, -10);

            this.body.setCollisionGroup(game.physics.p2.collisionGroups[CollisionGroup.Enemy]);
            this.body.collides([
                game.physics.p2.collisionGroups[CollisionGroup.Terrain],
                game.physics.p2.collisionGroups[CollisionGroup.Enemy],
                game.physics.p2.collisionGroups[CollisionGroup.Player],
                game.physics.p2.collisionGroups[CollisionGroup.Projectile]
            ]);

            this.body.rotation = rotation + Math.PI;
            this.body.thrust(-10000);
            

            game.add.existing(this);
        }

        damage(amount: number): Phaser.Sprite {
            super.damage(amount);
            
            return this;
        }
    }
}
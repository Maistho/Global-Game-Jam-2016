module Helix {
    export enum SpawnType { Helix, Dome }

    export class Spawn extends Phaser.Sprite {
        game: Phaser.Game;
        spawnDistance: number = 800;
        spawnTimer: Phaser.TimerEvent;
        body: Phaser.Physics.P2.Body;
        constructor(
            game: Phaser.Game,
            x: number,
            y: number,
            type: SpawnType
        ) {
            super(game, x, y, SpawnType[type]);
            this.anchor.set(0.5, 0.5);
            this.scale.set(0.2);
            this.maxHealth = 20;
            this.health = this.maxHealth;

            game.physics.p2.enable(this);
            this.body.static = true;
            this.body.setCircle(100, 0, 0);

            this.body.setCollisionGroup(game.physics.p2.collisionGroups[CollisionGroup.Terrain]);
            this.body.collides(game.physics.p2.collisionGroups);

            game.add.existing(this);

            this.spawnTimer = this.game.time.events.loop(Phaser.Timer.SECOND * .5, () => {
                this.spawnEnemy(EnemyType.Regular);
            }, this);
        }

        private circlePosition(radius: number): { rotation: number, pos: Phaser.Point } {
            var rot = Math.random() * Math.PI * 2;
            return { rotation: rot, pos: new Phaser.Point(Math.sin(rot) * radius, Math.cos(rot) * radius) };
        }

        spawnEnemy(enemyType: EnemyType) {
            var {rotation, pos} = this.circlePosition(this.spawnDistance);
            pos.add(this.x, this.y);
            var enemy = new Enemy(this.game, pos.x, pos.y, -rotation, enemyType);
        }

        damage(amount): Phaser.Sprite {
            super.damage(amount);
                console.log(this.health);
            return this;
        }
    }
}
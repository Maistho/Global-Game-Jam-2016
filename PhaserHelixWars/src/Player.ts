module Helix {

    export class Player extends Phaser.Sprite {
        game: Phaser.Game;
        body: Phaser.Physics.P2.Body;
        myBullets: Phaser.Group;
        constructor(
            game: Phaser.Game,
            x: number,
            y: number,
            private gamepad: Phaser.SinglePad
        ) {
            super(game, x, y, 'player');
            this.anchor.set(0.5, 0.4);
            this.scale.set(0.2);
            game.physics.p2.enable(this);

            this.body.setCircle(60, 0, -10);

            this.body.setCollisionGroup(game.physics.p2.collisionGroups[CollisionGroup.Player]);
            this.body.collides([
                game.physics.p2.collisionGroups[CollisionGroup.Enemy],
                game.physics.p2.collisionGroups[CollisionGroup.Terrain]
            ]);
           

            this.gamepad.addCallbacks(this, {
                onConnect: () => {
                    let shootButton = this.gamepad.getButton(Phaser.Gamepad.BUTTON_5);

                    shootButton.onDown.add(() => {
                        console.log('start shooting');
                        let bullet = new Bullet(this.game, this.x, this.y, this.body.rotation + Math.PI);
                    });
                }
            });
            game.add.existing(this);
        }

        update() {

            let left_hori = this.gamepad.axis(Phaser.Gamepad.AXIS_0);
            let left_vert = this.gamepad.axis(Phaser.Gamepad.AXIS_1);
            if ((Math.abs(left_vert) +
                Math.abs(left_hori)) > 0.1) {
                this.body.velocity.x += left_hori * 100;
                this.body.velocity.y += left_vert * 100;
            }

            let right_vert = this.gamepad.axis(Phaser.Gamepad.AXIS_2);
            let right_hori = this.gamepad.axis(Phaser.Gamepad.AXIS_3);
            if ((Math.abs(right_vert) +
                Math.abs(right_hori)) > 0.1) {
                this.body.rotation = -Math.atan2(right_vert, right_hori);

            }

            this.body.angularVelocity = 0;
            //Drag
            this.body.velocity.x *= 0.9;
            this.body.velocity.y *= 0.9;
        }
    }
}
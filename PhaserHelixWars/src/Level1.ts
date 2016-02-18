module Helix {
    export class Level1 extends Phaser.State {
        pad1: Phaser.SinglePad;
        players: Phaser.Group;
        spawns: Spawn[];
        bullets: Phaser.Group;
        preload() {
            console.log('in preload');
            this.load.image('player', 'sprites/Turquise_Pointy_Character.png');
            this.load.image('checkerboard', 'sprites/checkerboard.png');
            this.load.image('Helix', 'sprites/Helix_Fossil.png');
            this.load.image('RegularEnemy', 'sprites/Magenta_Pointy_Character.png');
            this.load.image('bullet', 'sprites/Arrow.png');

            this.load.audio('hit1', 'audio/hit_01.ogg');
            this.load.audio('shoot', 'audio/shoot.ogg');

            this.time.advancedTiming = true;

            //this.stage.disableVisibilityChange = true;
        }

        create() {
            console.log('in create');
            this.world.setBounds(0, 0, 2920, 2920);
            this.add.tileSprite(0, 0, 2920, 2920, 'checkerboard');
            this.physics.startSystem(Phaser.Physics.P2JS);
            var cg = new CollisionGroup(this.game);
            this.physics.p2.setImpactEvents(true);
            

            this.bullets = this.add.group();
            this.players = this.add.group();



            this.players.add(new Player(
                this.game,
                this.world.centerX,
                this.world.centerY,
                this.input.gamepad.pad2
            ));

            this.spawns = [];
            this.spawns.push(new Spawn(this.game,
                this.world.centerX,
                this.world.centerY,
                SpawnType.Helix));


            this.input.gamepad.setDeadZones(0.01);

            this.camera.follow(<Player>this.players.getAt(0));

            this.input.gamepad.start();
            setInterval(() => {
                this.input.gamepad.stop();
                this.input.gamepad.start();
            }, 1000)
            
        }

        update() {

        }

        render() {
            this.game.debug.text(this.time.fps.toString() || '--', 2, 14, "#00ff00");

        }
    }
}
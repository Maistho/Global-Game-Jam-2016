import {Player} from 'src/Player'
import {Spawn, SpawnType} from 'src/Spawn'
import {CollisionGroup} from 'src/CollisionGroups'

export class HelixGame {

    constructor() {
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }

    game: Phaser.Game;
    pad1: Phaser.SinglePad;
    players: Phaser.Group;
    spawns: Spawn[];
    bullets: Phaser.Group;

    preload() {
        this.game.load.image('player', 'sprites/Turquise_Pointy_Character.png');
        this.game.load.image('checkerboard', 'sprites/checkerboard.png');
        this.game.load.image('Helix', 'sprites/Helix_Fossil.png');
        this.game.load.image('RegularEnemy', 'sprites/Magenta_Pointy_Character.png');
        this.game.load.image('bullet', 'sprites/Arrow.png');
        this.game.time.advancedTiming = true;
        //this.game.stage.disableVisibilityChange = true;
    }

    create() {
        this.game.world.setBounds(0, 0, 2920, 2920);
        this.game.add.tileSprite(0, 0, 2920, 2920, 'checkerboard');
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.updateBoundsCollisionGroup();
        //this.game.physics.p2.setImpactEvents(true);

        this.bullets = this.game.add.group();
        this.players = this.game.add.group();



        this.players.add(new Player(
            this.game,
            this.game.world.centerX,
            this.game.world.centerY,
            this.game.input.gamepad.pad3
        ));

        this.spawns = [];
        this.spawns.push(new Spawn(this.game,
            this.game.world.centerX,
            this.game.world.centerY,
            SpawnType.Helix));

        
        this.game.input.gamepad.setDeadZones(0.01);

        this.game.camera.follow(<Player>this.players.getAt(0));

        this.game.input.gamepad.start();
        setInterval(() => {
            this.game.input.gamepad.stop();
            this.game.input.gamepad.start();
        }, 1000)
    }

    update() {
        this.players.forEachAlive((player) => {
            player.update();
        }, this);

            
       
            
    }
    render() {
        this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, "#00ff00");

    }


}

var game = new HelixGame();


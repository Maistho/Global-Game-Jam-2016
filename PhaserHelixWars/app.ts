import {Player} from './Player'
import {Spawn, SpawnType} from './Spawn'

class SimpleGame {

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
    players: Player[];
    spawns: Spawn[];

    preload() {
        this.game.load.image('player', 'sprites/Turquise_Pointy_Character.png');
        this.game.load.image('checkerboard', 'sprites/checkerboard.png');
        this.game.load.image('Helix', 'sprites/Helix_Fossil.png');
        this.game.time.advancedTiming = true;
        this.game.stage.disableVisibilityChange = true;
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.world.setBounds(0, 0, 1920, 1920);
        this.game.add.tileSprite(0, 0, 1920, 1920, 'checkerboard');

        this.players = [];
        this.players.push(new Player(this.game,
            this.game.world.centerX,
            this.game.world.centerY,
            this.game.input.gamepad.pad1));

        this.spawns = [];
        this.spawns.push(new Spawn(this.game,
            this.game.world.centerX,
            this.game.world.centerY,
            SpawnType.Helix));
        

        this.game.input.gamepad.setDeadZones(0.01);

        this.game.camera.follow(this.players[0]);

        this.game.input.gamepad.start();
        setInterval(() => {
            this.game.input.gamepad.stop();
            this.game.input.gamepad.start();
        }, 1000)
    }

    update() {
        this.players.forEach((player) => {
            player.update();
        });
            
       
            
    }
    render() {
        this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, "#00ff00");
        this.game.debug.body(this.players[0]);
    }


}

var game = new SimpleGame();


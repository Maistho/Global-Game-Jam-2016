define(["require", "exports", './Player', './Spawn'], function (require, exports, Player_1, Spawn_1) {
    var SimpleGame = (function () {
        function SimpleGame() {
            this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
        }
        SimpleGame.prototype.preload = function () {
            this.game.load.image('player', 'sprites/Turquise_Pointy_Character.png');
            this.game.load.image('checkerboard', 'sprites/checkerboard.png');
            this.game.load.image('Helix', 'sprites/Helix_Fossil.png');
            this.game.time.advancedTiming = true;
            this.game.stage.disableVisibilityChange = true;
        };
        SimpleGame.prototype.create = function () {
            var _this = this;
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.world.setBounds(0, 0, 1920, 1920);
            this.game.add.tileSprite(0, 0, 1920, 1920, 'checkerboard');
            this.players = [];
            this.players.push(new Player_1.Player(this.game, this.game.world.centerX, this.game.world.centerY, this.game.input.gamepad.pad1));
            this.spawns = [];
            this.spawns.push(new Spawn_1.Spawn(this.game, this.game.world.centerX, this.game.world.centerY, Spawn_1.SpawnType.Helix));
            this.game.input.gamepad.setDeadZones(0.01);
            this.game.camera.follow(this.players[0]);
            this.game.input.gamepad.start();
            setInterval(function () {
                _this.game.input.gamepad.stop();
                _this.game.input.gamepad.start();
            }, 1000);
        };
        SimpleGame.prototype.update = function () {
            this.players.forEach(function (player) {
                player.update();
            });
        };
        SimpleGame.prototype.render = function () {
            this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, "#00ff00");
            this.game.debug.body(this.players[0]);
        };
        return SimpleGame;
    })();
    var game = new SimpleGame();
});
//# sourceMappingURL=app.js.map
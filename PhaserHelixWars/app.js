define(["require", "exports", 'src/Player', 'src/Spawn'], function (require, exports, Player_1, Spawn_1) {
    var HelixGame = (function () {
        function HelixGame() {
            this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
        }
        HelixGame.prototype.preload = function () {
            this.game.load.image('player', 'sprites/Turquise_Pointy_Character.png');
            this.game.load.image('checkerboard', 'sprites/checkerboard.png');
            this.game.load.image('Helix', 'sprites/Helix_Fossil.png');
            this.game.load.image('RegularEnemy', 'sprites/Magenta_Pointy_Character.png');
            this.game.load.image('bullet', 'sprites/Arrow.png');
            this.game.time.advancedTiming = true;
            //this.game.stage.disableVisibilityChange = true;
        };
        HelixGame.prototype.create = function () {
            var _this = this;
            this.game.world.setBounds(0, 0, 2920, 2920);
            this.game.add.tileSprite(0, 0, 2920, 2920, 'checkerboard');
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.updateBoundsCollisionGroup();
            //this.game.physics.p2.setImpactEvents(true);
            this.bullets = this.game.add.group();
            this.players = this.game.add.group();
            this.players.add(new Player_1.Player(this.game, this.game.world.centerX, this.game.world.centerY, this.game.input.gamepad.pad3));
            this.spawns = [];
            this.spawns.push(new Spawn_1.Spawn(this.game, this.game.world.centerX, this.game.world.centerY, Spawn_1.SpawnType.Helix));
            this.game.input.gamepad.setDeadZones(0.01);
            this.game.camera.follow(this.players.getAt(0));
            this.game.input.gamepad.start();
            setInterval(function () {
                _this.game.input.gamepad.stop();
                _this.game.input.gamepad.start();
            }, 1000);
        };
        HelixGame.prototype.update = function () {
            this.players.forEachAlive(function (player) {
                player.update();
            }, this);
        };
        HelixGame.prototype.render = function () {
            this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, "#00ff00");
        };
        return HelixGame;
    })();
    exports.HelixGame = HelixGame;
    var game = new HelixGame();
});
//# sourceMappingURL=app.js.map
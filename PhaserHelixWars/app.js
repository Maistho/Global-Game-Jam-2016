var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'src/Player', 'src/Spawn'], function (require, exports, Player_1, Spawn_1) {
    var CollisionGroup = (function () {
        function CollisionGroup(game) {
            this.Player = game.physics.p2.createCollisionGroup();
            this.Enemy = game.physics.p2.createCollisionGroup();
            this.Terrain = game.physics.p2.createCollisionGroup();
            this.Projectile = game.physics.p2.createCollisionGroup();
        }
        return CollisionGroup;
    })();
    var HelixGame = (function (_super) {
        __extends(HelixGame, _super);
        function HelixGame() {
            _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
        }
        HelixGame.prototype.preload = function () {
            console.log('in preload');
            this.load.image('player', 'sprites/Turquise_Pointy_Character.png');
            this.load.image('checkerboard', 'sprites/checkerboard.png');
            this.load.image('Helix', 'sprites/Helix_Fossil.png');
            this.load.image('RegularEnemy', 'sprites/Magenta_Pointy_Character.png');
            this.load.image('bullet', 'sprites/Arrow.png');
            this.time.advancedTiming = true;
            //this.stage.disableVisibilityChange = true;
        };
        HelixGame.prototype.create = function () {
            var _this = this;
            console.log('in create');
            this.world.setBounds(0, 0, 2920, 2920);
            this.add.tileSprite(0, 0, 2920, 2920, 'checkerboard');
            this.physics.startSystem(Phaser.Physics.P2JS);
            this.CollisionGroup = new CollisionGroup(this);
            this.physics.p2.updateBoundsCollisionGroup();
            //this.physics.p2.setImpactEvents(true);
            this.bullets = this.add.group();
            debugger;
            this.players = this.add.group();
            this.players.add(new Player_1.Player(this, this.world.centerX, this.world.centerY, this.input.gamepad.pad2));
            this.spawns = [];
            this.spawns.push(new Spawn_1.Spawn(this, this.world.centerX, this.world.centerY, Spawn_1.SpawnType.Helix));
            this.input.gamepad.setDeadZones(0.01);
            this.camera.follow(this.players.getAt(0));
            this.input.gamepad.start();
            setInterval(function () {
                _this.input.gamepad.stop();
                _this.input.gamepad.start();
            }, 1000);
        };
        HelixGame.prototype.update = function () {
            this.players.forEachAlive(function (player) {
                player.update();
            }, this);
        };
        HelixGame.prototype.render = function () {
            this.debug.text(this.time.fps.toString() || '--', 2, 14, "#00ff00");
        };
        return HelixGame;
    })(Phaser.Game);
    exports.HelixGame = HelixGame;
    var game = new HelixGame();
});
//# sourceMappingURL=app.js.map
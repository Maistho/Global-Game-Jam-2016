window.onload = function () {
    var game = new Helix.Game();
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Helix;
(function (Helix) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(game, x, y, rotation) {
            var _this = this;
            _super.call(this, game, x, y, 'bullet');
            this.anchor.set(0.5, 0.5);
            this.scale.set(0.1);
            game.physics.p2.enable(this);
            this.events.onOutOfBounds.add(function () {
                _this.kill();
            }, this);
            this.body.kinematic = true;
            this.body.rotation = rotation;
            var speed = 300;
            this.body.velocity.x = Math.sin(rotation) * speed;
            this.body.velocity.y = Math.cos(rotation) * -speed;
            this.body.setCollisionGroup(game.physics.p2.collisionGroups[Helix.CollisionGroup.Projectile]);
            this.body.collides([
                game.physics.p2.collisionGroups[Helix.CollisionGroup.Enemy],
                game.physics.p2.collisionGroups[Helix.CollisionGroup.Terrain]
            ], function (obj1, obj2) {
                _this.destroy();
                obj2.sprite.damage(1);
            });
            game.add.existing(this);
        }
        return Bullet;
    })(Phaser.Sprite);
    Helix.Bullet = Bullet;
})(Helix || (Helix = {}));
var Helix;
(function (Helix) {
    var CollisionGroup = (function () {
        function CollisionGroup(game) {
            for (var i = 0; i < 4; ++i) {
                game.physics.p2.createCollisionGroup();
            }
            game.physics.p2.updateBoundsCollisionGroup();
            console.log('Created ' +
                game.physics.p2.collisionGroups.length +
                ' CollisionGroups!', game.physics.p2.collisionGroups);
        }
        CollisionGroup.Player = 0;
        CollisionGroup.Enemy = 1;
        CollisionGroup.Terrain = 2;
        CollisionGroup.Projectile = 3;
        return CollisionGroup;
    })();
    Helix.CollisionGroup = CollisionGroup;
})(Helix || (Helix = {}));
var Helix;
(function (Helix) {
    (function (EnemyType) {
        EnemyType[EnemyType["Regular"] = 0] = "Regular";
        EnemyType[EnemyType["Weird"] = 1] = "Weird";
    })(Helix.EnemyType || (Helix.EnemyType = {}));
    var EnemyType = Helix.EnemyType;
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(game, x, y, rotation, type) {
            _super.call(this, game, x, y, EnemyType[type] + 'Enemy');
            this.anchor.set(0.5, 0.4);
            this.scale.set(0.2);
            //this.tint = 0xff00ff;
            this.maxHealth = 2;
            this.health = this.maxHealth;
            game.physics.p2.enable(this);
            this.body.setCircle(60, 0, -10);
            this.body.setCollisionGroup(game.physics.p2.collisionGroups[Helix.CollisionGroup.Enemy]);
            this.body.collides([
                game.physics.p2.collisionGroups[Helix.CollisionGroup.Terrain],
                game.physics.p2.collisionGroups[Helix.CollisionGroup.Enemy],
                game.physics.p2.collisionGroups[Helix.CollisionGroup.Player],
                game.physics.p2.collisionGroups[Helix.CollisionGroup.Projectile]
            ]);
            this.body.rotation = rotation + Math.PI;
            this.body.thrust(-10000);
            game.add.existing(this);
        }
        Enemy.prototype.damage = function (amount) {
            _super.prototype.damage.call(this, amount);
            console.log('did damage');
            return this;
        };
        return Enemy;
    })(Phaser.Sprite);
    Helix.Enemy = Enemy;
})(Helix || (Helix = {}));
var Helix;
(function (Helix) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
            this.state.add('Level1', Helix.Level1, false);
            this.state.start('Level1');
        }
        return Game;
    })(Phaser.Game);
    Helix.Game = Game;
})(Helix || (Helix = {}));
var Helix;
(function (Helix) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.preload = function () {
            console.log('in preload');
            this.load.image('player', 'sprites/Turquise_Pointy_Character.png');
            this.load.image('checkerboard', 'sprites/checkerboard.png');
            this.load.image('Helix', 'sprites/Helix_Fossil.png');
            this.load.image('RegularEnemy', 'sprites/Magenta_Pointy_Character.png');
            this.load.image('bullet', 'sprites/Arrow.png');
            this.time.advancedTiming = true;
            //this.stage.disableVisibilityChange = true;
        };
        Level1.prototype.create = function () {
            var _this = this;
            console.log('in create');
            this.world.setBounds(0, 0, 2920, 2920);
            this.add.tileSprite(0, 0, 2920, 2920, 'checkerboard');
            this.physics.startSystem(Phaser.Physics.P2JS);
            var cg = new Helix.CollisionGroup(this.game);
            this.physics.p2.setImpactEvents(true);
            this.bullets = this.add.group();
            this.players = this.add.group();
            this.players.add(new Helix.Player(this.game, this.world.centerX, this.world.centerY, this.input.gamepad.pad2));
            this.spawns = [];
            this.spawns.push(new Helix.Spawn(this.game, this.world.centerX, this.world.centerY, Helix.SpawnType.Helix));
            this.input.gamepad.setDeadZones(0.01);
            this.camera.follow(this.players.getAt(0));
            this.input.gamepad.start();
            setInterval(function () {
                _this.input.gamepad.stop();
                _this.input.gamepad.start();
            }, 1000);
        };
        Level1.prototype.update = function () {
        };
        Level1.prototype.render = function () {
            this.game.debug.text(this.time.fps.toString() || '--', 2, 14, "#00ff00");
        };
        return Level1;
    })(Phaser.State);
    Helix.Level1 = Level1;
})(Helix || (Helix = {}));
var Helix;
(function (Helix) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, gamepad) {
            var _this = this;
            _super.call(this, game, x, y, 'player');
            this.gamepad = gamepad;
            this.anchor.set(0.5, 0.4);
            this.scale.set(0.2);
            game.physics.p2.enable(this);
            this.body.setCircle(60, 0, -10);
            this.body.setCollisionGroup(game.physics.p2.collisionGroups[Helix.CollisionGroup.Player]);
            this.body.collides([
                game.physics.p2.collisionGroups[Helix.CollisionGroup.Enemy],
                game.physics.p2.collisionGroups[Helix.CollisionGroup.Terrain]
            ]);
            this.gamepad.addCallbacks(this, {
                onConnect: function () {
                    var shootButton = _this.gamepad.getButton(Phaser.Gamepad.BUTTON_5);
                    shootButton.onDown.add(function () {
                        console.log('start shooting');
                        var bullet = new Helix.Bullet(_this.game, _this.x, _this.y, _this.body.rotation + Math.PI);
                    });
                }
            });
            game.add.existing(this);
        }
        Player.prototype.update = function () {
            var left_hori = this.gamepad.axis(Phaser.Gamepad.AXIS_0);
            var left_vert = this.gamepad.axis(Phaser.Gamepad.AXIS_1);
            if ((Math.abs(left_vert) +
                Math.abs(left_hori)) > 0.1) {
                this.body.velocity.x += left_hori * 100;
                this.body.velocity.y += left_vert * 100;
            }
            var right_vert = this.gamepad.axis(Phaser.Gamepad.AXIS_2);
            var right_hori = this.gamepad.axis(Phaser.Gamepad.AXIS_3);
            if ((Math.abs(right_vert) +
                Math.abs(right_hori)) > 0.1) {
                this.body.rotation = -Math.atan2(right_vert, right_hori);
            }
            this.body.angularVelocity = 0;
            //Drag
            this.body.velocity.x *= 0.9;
            this.body.velocity.y *= 0.9;
        };
        return Player;
    })(Phaser.Sprite);
    Helix.Player = Player;
})(Helix || (Helix = {}));
var Helix;
(function (Helix) {
    (function (SpawnType) {
        SpawnType[SpawnType["Helix"] = 0] = "Helix";
        SpawnType[SpawnType["Dome"] = 1] = "Dome";
    })(Helix.SpawnType || (Helix.SpawnType = {}));
    var SpawnType = Helix.SpawnType;
    var Spawn = (function (_super) {
        __extends(Spawn, _super);
        function Spawn(game, x, y, type) {
            var _this = this;
            _super.call(this, game, x, y, SpawnType[type]);
            this.spawnDistance = 300;
            this.anchor.set(0.5, 0.5);
            this.scale.set(0.2);
            game.physics.p2.enable(this);
            this.body.static = true;
            this.body.setCircle(100, 0, 0);
            this.body.setCollisionGroup(game.physics.p2.collisionGroups[Helix.CollisionGroup.Terrain]);
            this.body.collides(game.physics.p2.collisionGroups);
            game.add.existing(this);
            this.spawnTimer = this.game.time.events.loop(Phaser.Timer.SECOND * .5, function () {
                _this.spawnEnemy(Helix.EnemyType.Regular);
            }, this);
        }
        Spawn.prototype.circlePosition = function (radius) {
            var rot = Math.random() * Math.PI * 2;
            return { rotation: rot, pos: new Phaser.Point(Math.sin(rot) * radius, Math.cos(rot) * radius) };
        };
        Spawn.prototype.spawnEnemy = function (enemyType) {
            var _a = this.circlePosition(this.spawnDistance), rotation = _a.rotation, pos = _a.pos;
            pos.add(this.x, this.y);
            var enemy = new Helix.Enemy(this.game, pos.x, pos.y, -rotation, enemyType);
        };
        return Spawn;
    })(Phaser.Sprite);
    Helix.Spawn = Spawn;
})(Helix || (Helix = {}));
//# sourceMappingURL=game.js.map
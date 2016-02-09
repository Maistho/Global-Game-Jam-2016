var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Enemy'], function (require, exports, Enemy_1) {
    (function (SpawnType) {
        SpawnType[SpawnType["Helix"] = 0] = "Helix";
        SpawnType[SpawnType["Dome"] = 1] = "Dome";
    })(exports.SpawnType || (exports.SpawnType = {}));
    var SpawnType = exports.SpawnType;
    var Spawn = (function (_super) {
        __extends(Spawn, _super);
        function Spawn(game, x, y, type) {
            var _this = this;
            _super.call(this, game, x, y, SpawnType[type]);
            this.spawnDistance = 800;
            this.anchor.set(0.5, 0.5);
            this.scale.set(0.2);
            game.physics.p2.enable(this);
            this.body.static = true;
            this.body.setCircle(100, 0, 0);
            game.add.existing(this);
            this.spawnTimer = this.game.time.events.loop(Phaser.Timer.SECOND * .5, function () {
                _this.spawnEnemy(Enemy_1.EnemyType.Regular);
            }, this);
        }
        Spawn.prototype.circlePosition = function (radius) {
            var rot = Math.random() * Math.PI * 2;
            return { rotation: rot, pos: new Phaser.Point(Math.sin(rot) * radius, Math.cos(rot) * radius) };
        };
        Spawn.prototype.spawnEnemy = function (enemyType) {
            var _a = this.circlePosition(this.spawnDistance), rotation = _a.rotation, pos = _a.pos;
            pos.add(this.x, this.y);
            var enemy = new Enemy_1.Enemy(this.game, pos.x, pos.y, -rotation, enemyType);
        };
        return Spawn;
    })(Phaser.Sprite);
    exports.Spawn = Spawn;
});
//# sourceMappingURL=Spawn.js.map
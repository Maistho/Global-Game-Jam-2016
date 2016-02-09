var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './CollisionGroups'], function (require, exports, CollisionGroups_1) {
    (function (EnemyType) {
        EnemyType[EnemyType["Regular"] = 0] = "Regular";
        EnemyType[EnemyType["Weird"] = 1] = "Weird";
    })(exports.EnemyType || (exports.EnemyType = {}));
    var EnemyType = exports.EnemyType;
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(game, x, y, rotation, type) {
            _super.call(this, game, x, y, EnemyType[type] + 'Enemy');
            this.anchor.set(0.5, 0.4);
            this.scale.set(0.2);
            //this.tint = 0xff00ff;
            game.physics.p2.enable(this);
            this.body.setCollisionGroup(CollisionGroups_1.CollisionGroup.Enemy);
            this.body.collides([CollisionGroups_1.CollisionGroup.Projectile, CollisionGroups_1.CollisionGroup.Enemy, CollisionGroups_1.CollisionGroup.Terrain]);
            this.body.setCircle(60, 0, -10);
            this.body.rotation = rotation + Math.PI;
            this.body.thrust(-10000);
            game.add.existing(this);
        }
        return Enemy;
    })(Phaser.Sprite);
    exports.Enemy = Enemy;
});
//# sourceMappingURL=Enemy.js.map
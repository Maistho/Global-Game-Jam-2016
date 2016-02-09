var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(game, x, y, rotation) {
            var _this = this;
            _super.call(this, game, x, y, 'bullet');
            this.anchor.set(0.5, 0.5);
            this.scale.set(0.2);
            game.physics.p2.enable(this);
            this.events.onOutOfBounds.add(function () {
                _this.kill();
            }, this);
            // this.body.kinematic = true;
            //this.body.setCollisionGroup(CollisionGroup.Projectile);
            //this.body.collides([CollisionGroup.Enemy, CollisionGroup.Player]);
            this.body.onBeginContact.add(function (body, bodyB, shapeA, shapeB, equation) {
                console.log(body.sprite.key);
            }, this);
            game.add.existing(this);
        }
        return Bullet;
    })(Phaser.Sprite);
    exports.Bullet = Bullet;
});
//# sourceMappingURL=Bullet.js.map
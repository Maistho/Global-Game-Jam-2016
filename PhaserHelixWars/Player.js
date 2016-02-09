var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, gamepad) {
            _super.call(this, game, x, y, 'player');
            this.gamepad = gamepad;
            this.anchor.set(0.5, 0.4);
            this.scale.set(0.2);
            game.physics.p2.enable(this);
            this.body.setCircle(60, 0, -10);
            game.add.existing(this);
        }
        Player.prototype.moveHori = function (amount) {
            this.body.velocity.x += amount;
        };
        Player.prototype.update = function () {
            var left_hori = this.gamepad.axis(Phaser.Gamepad.AXIS_0);
            var left_vert = this.gamepad.axis(Phaser.Gamepad.AXIS_1);
            var right_vert = this.gamepad.axis(Phaser.Gamepad.AXIS_2);
            var right_hori = this.gamepad.axis(Phaser.Gamepad.AXIS_3);
            if ((Math.abs(left_vert) +
                Math.abs(left_hori)) > 0.1) {
                this.body.velocity.x += left_hori * 100;
                this.body.velocity.y += left_vert * 100;
            }
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
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map
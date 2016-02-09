var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    (function (SpawnType) {
        SpawnType[SpawnType["Helix"] = 0] = "Helix";
        SpawnType[SpawnType["Dome"] = 1] = "Dome";
    })(exports.SpawnType || (exports.SpawnType = {}));
    var SpawnType = exports.SpawnType;
    var Spawn = (function (_super) {
        __extends(Spawn, _super);
        function Spawn(game, x, y, type) {
            console.log([SpawnType[type]]);
            _super.call(this, game, x, y, SpawnType[type]);
            this.anchor.set(0.5, 0.5);
            this.scale.set(0.5);
            game.add.existing(this);
        }
        return Spawn;
    })(Phaser.Sprite);
    exports.Spawn = Spawn;
});
//# sourceMappingURL=Spawn.js.map
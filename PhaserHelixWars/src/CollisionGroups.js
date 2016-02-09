define(["require", "exports"], function (require, exports) {
    var CollisionGroup = (function () {
        function CollisionGroup() {
        }
        CollisionGroup.Player = new Phaser.Physics.P2.CollisionGroup(Math.pow(2, 1));
        CollisionGroup.Enemy = new Phaser.Physics.P2.CollisionGroup(Math.pow(2, 2));
        CollisionGroup.Terrain = new Phaser.Physics.P2.CollisionGroup(Math.pow(2, 3));
        CollisionGroup.Projectile = new Phaser.Physics.P2.CollisionGroup(Math.pow(2, 4));
        return CollisionGroup;
    })();
    exports.CollisionGroup = CollisionGroup;
});
//# sourceMappingURL=CollisionGroups.js.map
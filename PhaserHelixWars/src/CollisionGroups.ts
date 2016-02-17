module Helix { 
    export class CollisionGroup {
        static Player: number = 0;
        static Enemy: number = 1;
        static Terrain: number = 2;
        static Projectile: number = 3;
        constructor(game: Phaser.Game) {
            for (let i = 0; i < 4; ++i) {
                game.physics.p2.createCollisionGroup();
            }

            game.physics.p2.updateBoundsCollisionGroup();

            console.log('Created ' +
                game.physics.p2.collisionGroups.length +
                ' CollisionGroups!',
                game.physics.p2.collisionGroups);
        }
    }
}
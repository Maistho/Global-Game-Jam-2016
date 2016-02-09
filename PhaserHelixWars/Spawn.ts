export enum SpawnType { Helix, Dome }

export class Spawn extends Phaser.Sprite {
    constructor(
        game: Phaser.Game,
        x: number,
        y: number,
        type: SpawnType
    ) {
        console.log([SpawnType[type]]);
        super(game, x, y, SpawnType[type]);
        this.anchor.set(0.5, 0.5);
        this.scale.set(0.5);


        game.add.existing(this);
    }
}
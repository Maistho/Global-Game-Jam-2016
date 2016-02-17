module Helix {

    export class Game extends Phaser.Game {
        constructor() {
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);

            this.state.add('Level1', Level1, false);

            this.state.start('Level1');
        }




    }
}
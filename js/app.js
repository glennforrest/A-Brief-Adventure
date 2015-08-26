/* global Phaser */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

    game.state.add('boot', bootState);
    game.state.add('loader', loaderState);
    game.state.add('menu', menuState);
    game.state.add('game', gameState);
    game.state.add('win', winState);

    //  Now start the Boot state.
    game.state.start('boot');


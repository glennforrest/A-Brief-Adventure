/* global game */
/* global Phaser */

var bootState = {
    preload: function () {
        // load preloader assets e.g. for loading screen / splashscreen
        game.load.image('space', '/assets/images/space.png');
        game.load.image('loadingBar', '/assets/images/loading-bar.png');
        game.load.image('loadingBarContainer', '/assets/images/loading-bar-container.png');
        // Load the stars background
        // Load the sprite for the loading bar
    },
    create: function () {
        // setup game environment
        // scale, input etc..
        // Starting the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Calling the load state
        game.state.start('loader');
    }
};

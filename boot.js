/* global game */
/* global Phaser */

var bootState = {
    preload: function () {
        // load preloader assets e.g. for loading screen / splashscreen
        
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

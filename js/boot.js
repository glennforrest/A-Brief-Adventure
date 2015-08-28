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

        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(800, 600, 1024, 768);
        //    this.scale.pageAlignHorizontally = true;
         //   this.scale.pageAlignVertically = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
        // Calling the load state
        game.state.start('loader');
    }
};

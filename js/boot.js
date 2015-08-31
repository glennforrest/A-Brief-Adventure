/* global game */
/* global Phaser */

var bootState = {
    
    preload: function () {
        // load preloader assets e.g. for loading screen / splashscreen
        game.load.image('space', '/assets/images/space.png');
        game.load.image('loadingBar', '/assets/images/loading-bar.png');
        game.load.image('loadingBarContainer', '/assets/images/loading-bar-container.png');
        game.load.image('orientation', 'orientation.png');
        // Load the stars background
        // Load the sprite for the loading bar
    },
    create: function () {
        // setup game environment
        // scale, input etc..
        // Starting the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        if (!this.game.device.desktop) {
           
          this.scale.forceOrientation(true, false, 'orientation');
          this.scale.enterIncorrectOrientation.add(this.rescale, this);
        }

        // Calling the load state
        game.state.start('loader');
    },
    rescale: function() {

    // the game doesn't resize right away, so we need to delay here 
    var _this = this;
    setTimeout(function() {
      _this.scale.orientationSprite.scale.set(_this.game.width / _this.scale.width, _this.game.height / _this.scale.height) }, 100);
    
  }
};

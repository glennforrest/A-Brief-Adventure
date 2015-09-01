/* global game */
/* global Phaser */

var bootState = {
    
    preload: function () {
        // Loading assets needed for Loading screen
        // Ie. Background, loading bar, and orientation image
        game.load.image('space', '/assets/images/space.png');
        game.load.image('loadingBar', '/assets/images/loading-bar.png');
        game.load.image('loadingBarContainer', '/assets/images/loading-bar-container.png');
        game.load.image('orientation', '/assets/images/orientation.png');
    },
    create: function () {
        // setup game environment
        game.physics.startSystem(Phaser.Physics.ARCADE);


        // If game is on device, display 'Orientation' image when in portrait mode
        if (!this.game.device.desktop) {
          this.scale.forceOrientation(true, false, 'orientation');
          this.scale.enterIncorrectOrientation.add(this.rescale, this);
        }

        // Calling the loader state
        game.state.start('loader');
    },
    rescale: function() {

    // the game doesn't resize right away, so we need to delay here 
    var _this = this;
    setTimeout(function() {
      _this.scale.orientationSprite.scale.set(_this.game.width / _this.scale.width, _this.game.height / _this.scale.height) }, 100);
    }
};

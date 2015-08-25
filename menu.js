/* global game */
/* global Phaser */

var menuState = {
    create: function () {
        
        // Displaying Background and Text
        game.add.sprite(0, 0, 'space');
        game.add.text(80, 80, 'Platformer', {font:'50px Arial', fill:'#ffffff'} );
        game.add.text(80, 150, 'press the "up" key to start', {font:'25px Arial', fill:'#ffffff'} );                                
        game.add.image(700, 20, 'musicIcon');
        game.add.image(750, 20, 'SFXIcon');

        // Play intro music
        this.music = game.add.audio('introMusic');
        this.music.play();
        
        // Mapping the Up key
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
        // Event Listener calling the Start function to begin the game
        wKey.onDown.addOnce(this.start, this);
    },
    start: function () {
        // Stops the music
        this.music.stop();
        // Starts the game state
        game.state.start('game');
    }
};
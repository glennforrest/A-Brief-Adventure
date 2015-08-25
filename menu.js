/* global game */
/* global Phaser */

var menuState = {
    create: function () {
        
        // Displaying Background and Text
        game.add.sprite(0, 0, 'space');
        game.add.text(80, 80, 'Platformer', {font:'50px Arial', fill:'#ffffff'} );
        game.add.text(80, 150, 'press the "up" key to start', {font:'25px Arial', fill:'#ffffff'} );                                


        // Play intro music
        var music = game.add.audio('gameMusic');
        music.play();
        
        // Mapping the Up key
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
        // Event Listener calling the Start function to begin the game
        wKey.onDown.addOnce(this.start, this);
    },
    start: function () {
            game.state.start('game');
    }
};
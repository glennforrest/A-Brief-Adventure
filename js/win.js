/* global game */
/* global Phaser */

var winState = {
    preload: function () {
        // load preloader assets e.g. for loading screen / splashscreen
        game.load.image('space', '/assets/images/space.png');
        game.load.image('loadingBar', '/assets/images/loading-bar.png');
        game.load.image('loadingBarContainer', '/assets/images/loading-bar-container.png');
        // Load the stars background
        // Load the sprite for the loading bar
    },
    create: function () {
        // Displaying Background and Text
        game.add.sprite(0, 0, 'space');
        game.add.text(80, 80, 'A Brief Adventure', {font:'50px Arial', fill:'#ffffff'} );
        game.add.text(80, 150, 'You picked up your briefcase and won the game!', {font:'25px Arial', fill:'#ffffff'} );
        if(gameState.deathCounter == 0){
            game.add.text(80, 185, "Wow... You didn't even die!", {font:'25px Arial', fill:'#ffffff'} );
            game.add.text(80, 220, "You're good at picking up briefcases.", {font:'25px Arial', fill:'#ffffff'} );
        }else{
            game.add.text(80, 185, 'Great... But you died ' + gameState.deathCounter + ' times trying to pick it up.', {font:'25px Arial', fill:'#ffffff'} );
        }
        
        game.add.text(80, 450, 'Press the "up" key to pick it up again', {font:'25px Arial', fill:'#ffffff'} );
        game.add.text(80, 520, 'Game art: Summer Thaxton & Hannah Cohan.', {font:'20px Arial', fill:'#ffffff'} );
        game.add.text(80, 550, 'Music during game: Glenn Forrest.', {font:'20px Arial', fill:'#ffffff'} );
        
        var briefcase = game.add.image(80,275,'briefcase');
        
        // Play intro music
        this.music = game.add.audio('victoryMusic');
        // Loop play(marker, position, volume, loop, forceRestart)
        this.music.play('', 0, 0.2);
    
        // Mapping the Up key
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
        // Event Listener calling the Start function to begin the game
        wKey.onDown.addOnce(menuState.start, this);
        
        
    },
    update: function(){
        if(!this.music.isPlaying){
            this.music.play();
        }    
    },
    start: function(){
        // Stops the music
        this.music.stop();
        // Starts the game state
        game.state.start('game');
    }
};

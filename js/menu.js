/* global game */
/* global Phaser */

var menuState = {
    init: function(){
        if (this.game.device.desktop){
            //this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.input.onDown.add(this.gofull, this);
        }
        else{
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.input.onDown.add(this.gofull, this);
            this.input.onDown.add(this.start, this);
            
        }
        
        
    },
    
    gofull: function() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

    },
    create: function () {
        
        // Displaying Background and Text
        game.add.sprite(0, 0, 'space');
        game.add.text(80, 80, 'A Brief Adventure', {font:'50px Arial', fill:'#ffffff'} );
        if(game.device.desktop){
            game.add.text(80, 150, 'press the "up" key to start', {font:'25px Arial', fill:'#ffffff'} );
        }else{
            game.add.text(80, 150, 'touch the screen to start', {font:'25px Arial', fill:'#ffffff'} );
            game.add.text(80, 225, 'walk right: touch the right side of the screen', {font:'25px Arial', fill:'#ffffff'} );
            game.add.text(80, 260, 'walk left: touch the left side of the screen', {font:'25px Arial', fill:'#ffffff'} );
            game.add.text(80, 295, 'jump: swipe up on the screen', {font:'25px Arial', fill:'#ffffff'} );
            
        }
        this.musicIcon = game.add.image(700, 20, 'musicIcon');
        this.SFXIcon = game.add.image(750, 20, 'SFXIcon');
        // Enables all kind of input actions on this image (click, etc)
        this.musicIcon.alpha = 0.5;
        this.SFXIcon.alpha = 0.5;
        this.musicIcon.inputEnabled = true;
        this.SFXIcon.inputEnabled = true;
        
        // Adding the hover transparency
        this.musicIcon.events.onInputOver.add(this.hoverOver, this);
        this.musicIcon.events.onInputOut.add(this.onBlur, this);
        
        // Adding the event listener and calling toggleMusic method
        this.musicIcon.events.onInputDown.add(this.toggleMusic, this);
        
        // Play intro music
        this.music = game.add.audio('introMusic');
        // Loop play(marker, position, volume, loop, forceRestart)
        this.music.play();
    
        // Mapping the Up key
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        
        // Event Listener calling the Start function to begin the game
        wKey.onDown.addOnce(this.start, this);
        
    },
    toggleMusic: function() {
        this.musicIcon.alpha = 1;
        if(this.music.volume == 1){
            this.music.volume = 0;
        }else{
            this.music.volume = 1;
        }
    },
    hoverOver: function(){
        this.musicIcon.alpha = 0.8;
    },
    onBlur: function(){
        this.musicIcon.alpha = 0.5;
    },
    update: function(){
        if(!this.music.isPlaying){
            this.music.play();
        }    
    },
    start: function () {
        // Stops the music
        this.music.stop();
        // Starts the game state
        game.state.start('game');
    }
    
};
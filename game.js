/* global game */

var gameState = {
    
    
    preload: function(){
    // Check the states tutorial to see what needs to be inserted into this function here. Otherwise I might not need it?
       
    
    
    },
    
    
    create: function(){
        
        // Setting up arrow keys to move player
        this.cursors = game.input.keyboard.createCursorKeys();
        
        // Add in all assets
        
        // Game art
        var background = game.add.tileSprite(0, 0, 800, 600, 'snow'); 
        
        // Player & Enemies
        this.setupPlayer();
        
        // Sounds
        
        this.music = game.add.audio('gameMusic');
        
        // Starts the music playing
        this.music.play();
        
    },
    setupPlayer: function(){
        // The player and its settings
        this.player = game.add.sprite(32, game.world.height - 150, 'player');
    
        //  We need to enable physics on the player
        game.physics.arcade.enable(this.player);
    
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
    
        //  Our two animations, walking left and right. Third parameter
        // is for the framerate
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    },
    update: function(){
        // Checks whether the music has stopped playing, if so starts it again.
         if(!this.music.isPlaying){
            this.music.play();
        }
        
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;
    
        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.player.body.velocity.x = -150;
    
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 150;
    
            this.player.animations.play('right');
        }
        else
        {
            //  Stand still
            this.player.animations.stop();
            this.player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        // TODO Look into getting the jumping working, I think that the touching.down flag isn't being set,
        // Because it's checking against the collision with something other than the WORLD
        // So once I've created the ground platforms this might re-correct itself.
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = -350;
           // Add in the SFX sound for jumping
        }
    }
    
    
}
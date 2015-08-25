/* global game */

var gameState = {
    
    
    preload: function(){
    // Check the states tutorial to see what needs to be inserted into this function here. Otherwise I might not need it?
    var background = game.add.tileSprite(0, 0, 800, 600, 'snow');    
    
    
    },
    
    
    create: function(){
        // Add in all assets
        
        // Game art
        
        // Sounds
        
        this.music = game.add.audio('gameMusic');
        this.music.play();
        
    },
    update: function(){
         if(!this.music.isPlaying){
            this.music.play();
        }  
    }
    
    
}
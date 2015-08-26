/* global game */

var gameState = {
    
    create: function(){
        
        // Setting the bounds of the world
        game.world.setBounds(0, 0, 5000, 600);
        
        // Setting up arrow keys to move player
        this.cursors = game.input.keyboard.createCursorKeys();
        
        // Add in all assets
        
        // Game art
        game.add.tileSprite(0, 0, game.world.width, 600, 'snow'); 
        game.add.tileSprite(0, 300,game.world.width, 300, 'backgroundClouds');
        this.briefcase = game.add.image(game.world.width - 100, 300, 'briefcase');
        
        //  Platform/Wall/Ground/Clouds
        this.setupPlatforms();
        
        // Lava
        this.setupLava();
        
        // Player & Enemies
        this.setupPlayer();
        this.setupEnemies();
        
        
        this.musicIcon = game.add.image(700, 20, 'musicIcon');
        this.SFXIcon = game.add.image(750, 20, 'SFXIcon');
        // Enables all kind of input actions on this image (click, etc)
        this.musicIcon.alpha = 0.5;
        this.SFXIcon.alpha = 0.5;
        this.musicIcon.inputEnabled = true;
        this.musicIcon.fixedToCamera = true;
        this.SFXIcon.inputEnabled = true;
        this.SFXIcon.fixedToCamera = true;
        // Adding the hover transparency
        this.musicIcon.events.onInputOver.add(this.hoverOverMusic, this);
        this.musicIcon.events.onInputOut.add(this.onBlurMusic, this);
        
        // Adding the hover transparency
        this.SFXIcon.events.onInputOver.add(this.hoverOverSFX, this);
        this.SFXIcon.events.onInputOut.add(this.onBlurSFX, this);
        
        // Adding the event listener and calling toggleMusic method
        this.musicIcon.events.onInputDown.add(this.toggleMusic, this);
        // Adding the event listener and calling toggleMusic method
        this.SFXIcon.events.onInputDown.add(this.toggleSFX, this);
        // Sounds
        this.mute = false;
        this.SFXJump = game.add.audio('jump');
        this.SFXFootstep = game.add.audio('step');
        this.SFXLavaDrip = game.add.audio('lavaDrip');
        this.SFXLavaSplash = game.add.audio('lavaSplash');
        this.SFXLavaSizzle = game.add.audio('lavaSizzle');
        this.SFXDeath = game.add.audio('death');
        this.music = game.add.audio('gameMusic');
        
        // Starts the music playing
        this.music.play();
        
    },
    setupLava: function(){
        this.lavas = game.add.group();
        this.lavas.enableBody = true;
        this.dripLavas = game.add.group();
        this.dripLavas.enableBody = true;
        
        /**
         * Lava Pools
         */ 
        
        // Stage 2 
        this.generateLava(1632, 250, 'pool', 2.3, 10);
        
        // Stage 3
        this.generateLava(2031, 506, 'pool', 7.3, 2);
            
        /**
         * Lava Drips
         */ 
        
        // Stage 2
        this.generateLava(850, 418, 'drip', 0.1, 0.6, 0, 300);
        this.generateLava(1015, 418, 'drip', 0.1, 0.6, 0, 300);
        this.generateLava(1170, 418, 'drip', 0.1, 0.6, 0, 200);
        this.generateLava(1870, 80, 'drip', 0.1, 0.6, 500, 0);
        this.generateLava(1670, 22, 'drip', 0.1, 0.6, 500, 0);
        
    },
    generateLava: function(x, y, type, scaleX, scaleY, velocityX, velocityY){
        scaleX = scaleX || 1;
        scaleY = scaleY || 1;
        velocityX = velocityX || 0;
        velocityY = velocityY || 0;
        if(type == 'pool'){
            this.lava = this.lavas.create(x, y, 'lava');
            this.lava.scale.setTo(scaleX, scaleY);
            this.lava.body.immovable = true;
        }else if (type == 'drip'){
            this.lavaDrip = this.dripLavas.create(x, y, 'lava');
            this.lavaDrip.scale.setTo(scaleX, scaleY);
            this.lavaDrip.body.velocity.x = velocityX;
            this.lavaDrip.body.velocity.y = velocityY;
            this.lavaDrip.body.bounce.set(1, 1);
            this.lavaDrip.body.collideWorldBounds = true;
            
            
        }
        
    },
    setupEnemies: function(){
        
        // Adding in the enemies group
        this.enemies = game.add.group();
        
        //  We will enable physics for any object that is created in this group
        this.enemies.enableBody = true;
        
        /**
         * Creating Individual Enemies
         */
         
        // This is how to instantiate an Enemy
        this.enemyGenerator(50, 50, 'right');
        this.enemyGenerator(60, 60, 'left');
        this.enemyGenerator(100, 100, 'right');
        this.enemyGenerator(300, 300, 'left');
    },
    enemyGenerator: function(x, y, direction){
        this.enemy = this.enemies.create(x,y,'enemy');
        this.enemy.body.gravity.y = 300;
        this.enemy.body.bounce.set(1, 0.2);
        this.enemy.body.collideWorldBounds = true;
        //  Our two animations, walking left and right.
        this.enemy.animations.add('left', [0, 1], 10, true);
        this.enemy.animations.add('right', [2, 3], 10, true);
        // This will set them off in the direction wanted 
        if(direction == 'right'){
            this.enemy.animations.play('right', 10, true); // get enemy moving
            this.enemy.body.velocity.setTo(150);  
        }else if(direction == 'left'){
            this.enemy.animations.play('left', 10, true); // get enemy moving
            this.enemy.body.velocity.setTo(-150);  
        }
    },
    enemyAnimations: function(enemy){
      if(enemy.body.velocity.x==150){
             enemy.animations.play('right', 10, true); // get enemy moving
        }else if(enemy.body.velocity.x== -150){
            enemy.animations.play('left', 10, true); // get enemy moving
        }  
    },
    setupPlatforms: function(){
        
        /**
         * General Setup
         */
        
        this.platforms = game.add.group();
        this.cloudPlatforms = game.add.group();
        this.walls = game.add.group();
        
        //  We will enable physics for any object that is created in these groups
        this.platforms.enableBody = true;
        this.walls.enableBody = true;
        this.cloudPlatforms.enableBody = true;
        
        /**
         * Ground
         */
        
        // Here we create the ground.
        this.ground = this.platforms.create(1, game.world.height - 30, 'platform');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(game.world.width, 1);
        //  This stops it from falling away when you jump on it
        this.ground.body.immovable = true;
        
        
        /**
         * Walls
         * All listed from Left to Right, Bottom to Top
         */
         
        // Creating the walls on either end of the world
        this.platformGenerator(0, 0, 'wall');
        this.platformGenerator(game.world.width - 31, 0, 'wall');
        
        // Stage 1
        this.platformGenerator(400, 100, 'wall');
        this.platformGenerator(800, 0, 'wall', 1, 3);
        
        // Stage 2
        this.platformGenerator(1200, 0, 'wall', 1, 2.6);
        this.platformGenerator(1600, 200, 'wall' )
        this.platformGenerator(2000, 200, 'wall', 1, 2.6);
        this.platformGenerator(2084, 0, 'wall', 1, 0.8);
        
        // Stage 3
        this.platformGenerator(2365, 0, 'wall', 1, 1.5);
        this.platformGenerator(3200, 200, 'wall', 1, 2.6);
        
               
        /**
         * Platforms
         * All listed from Left to Right, Bottom to Top
         */
        
        // Stage 1
        this.platformGenerator(31, 280, 'platform');
        this.platformGenerator(265, 450, 'platform');
        this.platformGenerator(270, 100, 'platform', 2);
        this.platformGenerator(540, 300, 'platform', 1.8);
        
        // Stage 2
        this.platformGenerator(800, 385, 'platform', 2.6);
        this.platformGenerator(800, 385, 'platform', 2.6);
        this.platformGenerator(1200, 250, 'platform', 0.8);
        this.platformGenerator(1475, 430, 'platform', 0.8);
        this.platformGenerator(1715, 200, 'platform', 0.4);
        this.platformGenerator(1864, 200, 'platform', 0.4);
        
        // Stage 3
        this.platformGenerator(2600, 200, 'platform', 1);
        
        
        /**
         * Cloud Platforms
         */
        
        
    },
    platformGenerator: function(x, y, type, scaleX, scaleY){
        scaleX = scaleX || 1;
        scaleY = scaleY || 1;
        
        if(type == 'platform'){
            // Create the platform object/sprite
            this.ledge = this.platforms.create(x, y, 'platform');
            this.ledge.scale.setTo(scaleX, scaleY);
            this.ledge.body.immovable = true;
        }else if (type == 'wall'){
            
            // Default wall to reach the ground
            if (scaleY == 1 ){
                scaleY = game.world.height / 160;
            }
            // Create the wall object/sprite
            this.wall = this.walls.create(x, y, 'wall');
            this.wall.scale.setTo(scaleX, scaleY);
            this.wall.body.immovable = true;
        }else if (type == 'cloud'){
            this.cloud = this.cloudPlatforms.create(x, y, 'cloud');
            // Perhaps in here I'll be adding in the functionality to make the sprites move along a set path
        }
        
    },
    setupPlayer: function(){
        // The player and its settings
        // game.world.height - 150
        this.player = game.add.sprite(2000, 100 , 'player');
    
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
    killPlayer: function() {
    
        // Removes the player from the screen
        this.player.kill();
        // Play the death sound
        if(this.mute == false){
            this.SFXDeath.play();    
        }
        
        this.setupPlayer();
    },
    lavaPoolKillPlayer: function(){
        // Play the lava splash sound
        if(this.mute == false){
            this.SFXLavaSplash.play();
        }
        this.killPlayer();
    },
    lavaDripKillPlayer: function(){
        // Play the lava splash sound
        if(this.mute == false){
            this.SFXLavaSizzle.play();
        }
        this.killPlayer();
    },
    update: function(){
        // Checks whether the music has stopped playing, if so starts it again.
         if(!this.music.isPlaying){
            this.music.play();
        }
        
        this.width = game.world.width;
        
        //this.dripLavas.forEach(this.drippy, this);   
              
       // setTimeout(drip, 15000);
        /**
         * Collisions and overlaps
         */ 
        
        
        // Collisions
        
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.platforms, this.walls);
        game.physics.arcade.collide(this.enemies, this.platforms);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.collide(this.dripLavas, this.platforms);
        game.physics.arcade.collide(this.dripLavas, this.walls);
        
        // Overlaps
        
        game.physics.arcade.overlap(this.player, this.enemies, this.killPlayer, null, this);
       // game.physics.arcade.overlap(this.player, this.lavas, this.lavaPoolKillPlayer, null, this);
        game.physics.arcade.overlap(this.player, this.dripLavas, this.lavaDripKillPlayer, null, this);
        
        // Reset the players velocity (movement)
        this.player.body.velocity.x = 0;
    
        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
            if(this.player.body.touching.down){
                // Need to find a way to make sure that if the Footstep
                // is playing, that 
                if(this.mute == false){
                 this.SFXFootstep.play('', 0, 0.4, false, false);   
                }
                 
            }
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
            if(this.player.body.touching.down){
                // Need to find a way to make sure that if the Footstep
                // is playing, that 
                if(this.mute == false){
                    this.SFXFootstep.play('', 0, 0.4, false, false);   
                }
            }
        }
        else{
            //  Stand still
            this.player.animations.stop();
            this.player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -350;
            // Add in the SFX sound for jumping
            if(this.mute == false){
                this.SFXJump.play('', 0, 0.3);
            }
        }
        
        // Plays SFXDrip for each object/sprite
        this.dripLavas.forEach(this.drip, this);
        
        /**
         * Enemy update functions
         */
        
        this.enemies.forEach(this.enemyAnimations, this);
         
        
        // Setting up the camera to focus on the player
        game.camera.follow(this.player);
    }, 
    drip: function(lavaDrip){
        // Play the SFX of the drip here?
        if(lavaDrip.inCamera){
            if(lavaDrip.body.touching.down){
                if(this.mute == false){
                    this.SFXLavaDrip.play();
                }
            }    
        }
    },
    toggleMusic: function() {
        this.musicIcon.alpha = 1;
        if(this.music.volume == 1){
            this.music.volume = 0;
            this.musicIcon.tint = 0x000000;
        }else{
            this.music.volume = 1;
            this.musicIcon.tint = 0xffffff;
        }
    },
    hoverOverMusic: function(){
        this.musicIcon.alpha = 0.8;
    },
    onBlurMusic: function(){
        this.musicIcon.alpha = 0.5;
    },
    hoverOverSFX: function(){
        this.SFXIcon.alpha = 0.8;
    },
    onBlurSFX: function(){
        this.SFXIcon.alpha = 0.5;
    },
    toggleSFX: function() {
        this.SFXIcon.alpha = 1;
        if(this.mute == false){
            this.mute = true;
            this.SFXIcon.tint = 0x000000;
        }else if(this.mute == true){
            this.mute = false;
            this.SFXIcon.tint = 0xffffff;
        }
    }
    
};
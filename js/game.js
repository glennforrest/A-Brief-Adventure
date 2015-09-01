/* global game */

var gameState = {
    
    create: function(){
        
        // Setting up gestures for swiping
        this.gestures = new Gesture(game);
        this.gestures.onSwipe.add(this.swiped, this);
        // Setting the bounds of the world
        game.world.setBounds(0, 0, 5000, 600);
        
        // Setting up arrow keys to move player
        this.cursors = game.input.keyboard.createCursorKeys();
        
        // Add in all assets
        this.checkpointSpawnX = 155;
        this.checkpointSpawnY = 450;
        // Game art
        game.add.tileSprite(0, 0, game.world.width, 600, 'snow'); 
        game.add.tileSprite(0, 300,game.world.width, 300, 'backgroundClouds');
        // Setting these to default where the player spawns at the beginning
        //this.checkpointSpawnX = 32;
        //this.checkpointSpawnY = game.world.height - 150;

        this.deathCounter = 0;
        this.briefcase = game.add.sprite(game.world.width - 100, 522, 'briefcase');
        //  We need to enable physics on the player
        game.physics.arcade.enable(this.briefcase);
    
        //  Player physics properties. Give the little guy a slight bounce.
        this.briefcase.body.collideWorldBounds = true;
        this.briefcase.scale.setTo(0.3, 0.3);
        
        //  Platform/Wall/Ground/Clouds
        this.setupPlatforms();
        
        // Lava
        this.setupLava();
        
        // Player & Enemies
        this.setupPlayer();
        this.setupEnemies();
        
        this.setupCheckpoints();
        
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
        this.SFXFlag = game.add.audio('flag');
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
        
        
        // Stage 1
        this.generateLava(31, 580, 'pool', 0.43, 1);
        
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
        
        // Stage 3
        this.generateLava(2372, 240, 'drip', 0.1, 0.6, 0, 200);
        
        // Stage 4
        this.generateLava(3536, 380, 'drip', 0.1, 0.6, 0, 200);
        this.generateLava(3747, 380, 'drip', 0.1, 0.6, 0, 200);
        this.generateLava(3837, 380, 'drip', 0.1, 0.6, 0, 200);
        this.generateLava(4067, 380, 'drip', 0.1, 0.6, 0, 200);
        this.generateLava(4162, 380, 'drip', 0.1, 0.6, 0, 200);
        this.generateLava(4257, 380, 'drip', 0.1, 0.6, 0, 200);
        this.generateLava(4465, 380, 'drip', 0.1, 0.6, 0, 200);
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
        
        // Stage 1 
        //this.enemyGenerator(240, 522, 'right');
        this.enemyGenerator(38, 232, 'right');
        this.enemyGenerator(430, 50, 'left');
        this.enemyGenerator(750, 200, 'right', 'bounce');
        this.enemyGenerator(440, 522, 'right', 'bounce');
        this.enemyGenerator(1254, 522, 'left', 'bounce');
        
        
        // Stage 3
        this.enemyGenerator(2650, 160, 'right', 'bounce');
        
        // Stage 4
        this.enemyGenerator(3600, 522, 'right', 'bounce');
        this.enemyGenerator(3900, 522, 'right', 'bounce');
        this.enemyGenerator(4080, 522, 'left', 'bounce');
        this.enemyGenerator(4100, 522, 'left', 'bounce');
        this.enemyGenerator(4450, 522, 'left', 'bounce');
    },
    enemyGenerator: function(x, y, direction, bounce){
        this.enemy = this.enemies.create(x,y,'enemy');
        this.enemy.body.gravity.y = 300;
        bounce = bounce || '';
        
        this.enemy.body.bounce.set(1, 0.2);    
        this.enemy.body.collideWorldBounds = true;
        //  Our two animations, walking left and right.
        this.enemy.animations.add('left', [0, 1], 10, true);
        this.enemy.animations.add('right', [2, 3], 10, true);
        // This will set them off in the direction wanted 
        if(direction == 'right'){
            this.enemy.animations.play('right', 10, true); // get enemy moving
            if(bounce == 'bounce'){
                this.enemy.body.velocity.setTo(150);
            }else{
                this.enemy.body.velocity.x = 150;    
            }
              
        }else if(direction == 'left'){
            this.enemy.animations.play('left', 10, true); // get enemy moving
            if(bounce == 'bounce'){
                this.enemy.body.velocity.setTo(-150);
            }else{
                this.enemy.body.velocity.x = -150;  
            }        
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
        this.ground = this.platforms.create(100, game.world.height - 30, 'platform');
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
        this.platformGenerator(1600, 200, 'wall' );
        this.platformGenerator(2000, 200, 'wall', 1, 2.6);
        this.platformGenerator(2084, 0, 'wall', 1, 0.8);
        
        // Stage 3
        this.platformGenerator(2365, 0, 'wall', 1, 1.5);
        this.platformGenerator(2600, 184, 'wall', 0.5, 0.1);
        this.platformGenerator(2744, 184, 'wall', 0.5, 0.1);
        this.platformGenerator(3200, 200, 'wall', 1, 2.6);
        
        // Stage 4
        this.platformGenerator(3536, 0, 'wall', 1, 2.08);
        this.platformGenerator(3536, 550, 'wall', 1, 1);
        this.platformGenerator(3747, 550, 'wall', 1, 1);
        this.platformGenerator(3837, 550, 'wall', 1, 1);
        this.platformGenerator(4067, 550, 'wall', 1, 1);
        this.platformGenerator(4257, 550, 'wall', 1, 1);
        this.platformGenerator(4465, 550, 'wall', 1, 1);
        this.platformGenerator(4465, 0, 'wall', 1, 2.32);
               
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
        this.platformGenerator(825, 385, 'platform', 2.6);
        this.platformGenerator(800, 385, 'platform', 2.6);
        this.platformGenerator(1200, 250, 'platform', 0.8);
        this.platformGenerator(1475, 430, 'platform', 0.8);
        this.platformGenerator(1715, 200, 'platform', 0.4);
        this.platformGenerator(1864, 200, 'platform', 0.4);
        
        // Stage 3
        this.platformGenerator(2345, 430, 'platform', 0.3);
        this.platformGenerator(2600, 200, 'platform', 1);
        
        // Stage 4
        this.platformGenerator(3536, 300, 'platform', 6);
        
        /**
         * Cloud Platforms
         */
        
        // Stage 3
        this.platformGenerator(2130, 0, 'cloud', 1, 1, 0, 200);
        this.platformGenerator(2470, 445, 'cloud', 0.5, 0.5, 0, -200);
        this.platformGenerator(2880, 210, 'cloud', 0.5, 0.5, 100, 0);
    },
    platformGenerator: function(x, y, type, scaleX, scaleY, velocityX, velocityY){
        scaleX = scaleX || 1;
        scaleY = scaleY || 1;
        velocityX = velocityX || 0;
        velocityY = velocityY || 0;
        
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
            game.physics.arcade.enable(this.wall);
            this.wall.scale.setTo(scaleX, scaleY);
            this.wall.body.immovable = true;
        }else if (type == 'cloud'){
            this.cloud = this.cloudPlatforms.create(x, y, 'cloud');
            game.physics.arcade.enable(this.cloud);
            this.cloud.body.velocity.x = velocityX;
            this.cloud.body.velocity.y = velocityY;
            this.cloud.scale.setTo(scaleX, scaleY);
            this.cloud.body.bounce.set(1, 1);
            this.cloud.body.collideWorldBounds = true;
            this.cloud.body.immovable = true;
            this.cloud.originalPosition = {'x': x, 'y': y };
            this.cloud.originalVelocity = {'velocityX': velocityX, 'velocityY': velocityY};
            this.cloud.originalScale = {'scaleX': scaleX, 'scaleY': scaleY};
        }
    },
    killCloud: function(cloud, lava){
        // Could play the sizzle sound here
        if(cloud.inCamera){
            if(this.mute == false){
                this.SFXLavaSizzle.play('', 0, 0.7);
            }
        }
        // Destroys the cloud
        cloud.kill();
        // Create a new cloud object with same positions and velocity as previous
        this.platformGenerator(cloud.originalPosition.x, cloud.originalPosition.y, 'cloud', cloud.originalScale.scaleX, cloud.originalScale.scaleY, cloud.originalVelocity.velocityX, cloud.originalVelocity.velocityY);
    },
    cloudChangeDirection: function(cloud, object){
        // Converting Positive to Negative and vice versa
        cloud.body.velocity.x *= -1;
    },
    setupPlayer: function(){
        this.players = game.add.group();
        // The player and its settings
        this.player = this.players.create(this.checkpointSpawnX, this.checkpointSpawnY , 'player');
    
        //  We need to enable physics on the player
        game.physics.arcade.enable(this.player);
    
        //  Player physics properties. Give the little guy a slight bounce.
        //this.player.body.bounce.y = 0.2;
        //this.player.body.acceleration.y = -100;
        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
    
        //  Our two animations, walking left and right. Third parameter
        // is for the framerate
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        
    },
    killPlayer: function() {
    
        game.camera.unfollow;
        this.deathCounter++;
        
        // Removes the player from the screen
        this.player.kill();
        // Play the death sound
        if(this.mute == false){
            this.SFXDeath.play();    
        }
        //this.respawnPlayer();
       //setTimeout(this.setupPlayer, 2000);
       this.setupPlayer();
       //game.state.start('game');
    },
    respawnPlayer: function(){
        
        // console.log(this.checkpointSpawnX);
        // console.log(this.checkpointSpawnY);
        this.player.position = {x: this.checkpointSpawnX, y: this.checkpointSpawnY};
    },
    setupCheckpoints: function(){
        this.checkpoints = game.add.group();
        this.checkpoints.enableBody = true;
        
        
        this.checkpointGenerator(1525, 367);
        this.checkpointGenerator(3286, 507);
        
    },
    checkpointGenerator: function(x,y){
        this.checkpoint = this.checkpoints.create(x, y, 'flag');
        this.checkpoint.scale.setTo(0.6, 0.6);
        this.checkpoint.body.immovable = true;
        this.checkpoint.alpha = 0.2;
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
    checkpointActivate: function(player, checkpoint){
        // Changing alpha to indicate activation
        game.add.tween(checkpoint).to({alpha: 1}, 300).start();
        // Assigning the position of the checkpoint to variable to pass into setupPlayer()
        this.checkpointSpawnX = checkpoint.position.x;
        this.checkpointSpawnY = checkpoint.position.y;
        
        // Play the SFX if the checkpoint is not yet activated
        if(checkpoint.alpha == 0.2 ){
            if(this.mute == false){
                this.SFXFlag.play();
            }    
        }
    },
    update: function(){
        
        /**
         * Music methods
         */ 
        
        // Checks whether the music has stopped playing, if so starts it again.
         if(!this.music.isPlaying){
            this.music.play();
        }
        
        // Plays SFXDrip for each object/sprite
        this.dripLavas.forEach(this.drip, this);
        
        /**
         * Collisions and overlaps
         */ 
        
        // Collisions
        
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.player, this.cloudPlatforms);
        game.physics.arcade.collide(this.platforms, this.walls);
        game.physics.arcade.collide(this.enemies, this.platforms);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.collide(this.dripLavas, this.platforms);
        game.physics.arcade.collide(this.dripLavas, this.walls);
        
        // Overlaps
        
        game.physics.arcade.overlap(this.player, this.enemies, this.killPlayer, null, this);
        game.physics.arcade.overlap(this.player, this.lavas, this.lavaPoolKillPlayer, null, this);
        game.physics.arcade.overlap(this.player, this.dripLavas, this.lavaDripKillPlayer, null, this);
        game.physics.arcade.overlap(this.player, this.briefcase, this.win, null, this);
        game.physics.arcade.overlap(this.player, this.checkpoints, this.checkpointActivate, null, this);
        game.physics.arcade.overlap(this.cloudPlatforms, this.lavas, this.killCloud, null, this);
        game.physics.arcade.overlap(this.cloudPlatforms, this.walls, this.cloudChangeDirection, null, this);
        game.physics.arcade.overlap(this.cloudPlatforms, this.platforms, this.cloudChangeDirection, null, this);
        game.physics.arcade.overlap(this.enemies, this.lavas, this.killEnemies, null, this);
        
        /**
         * Player Movement
         */
         
        // Reset the players velocity (movement)
        this.player.body.velocity.x = 0;
    
        if (this.cursors.left.isDown){
            //  Move to the left
            this.player.body.velocity.x = -250;
            this.player.animations.play('left');
            if(this.player.body.touching.down){
                // If SFX is not muted
                if(this.mute == false){
                    // Loop over the SFXFootstep
                    this.SFXFootstep.play('', 0, 0.4, false, false);   
                }
            }
        }
        else if (this.cursors.right.isDown){
            //  Move to the right
            this.player.body.velocity.x = 250;
            this.player.animations.play('right');
            if(this.player.body.touching.down){
                // If SFX is not muted
                if(this.mute == false){
                    // Loop over the SFXFootstep
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
            
            this.player.body.velocity.y = -480;
            // SFX sound for jumping
            if(this.mute == false){
                this.SFXJump.play('', 0, 0.3);
            }
        }
        
        
        /**
         * Touch controls
         */
         
         this.gestures.update();
      
        /* Divide the current tap x coordinate to half the game.width, floor it and there you go */
            if(game.input.pointer1.x < 400 && game.input.pointer1.isDown){
                this.player.body.velocity.x = -250;
                this.player.animations.play('left');
                if(this.player.body.touching.down){
                    // If SFX is not muted
                    if(this.mute == false){
                        // Loop over the SFXFootstep
                        this.SFXFootstep.play('', 0, 0.4, false, false);   
                    }
                }
            }else if (game.input.pointer1.x > 400 && game.input.pointer1.isDown){
                //  Move to the right
                this.player.body.velocity.x = 250;
                this.player.animations.play('right');
                if(this.player.body.touching.down){
                    // If SFX is not muted
                    if(this.mute == false){
                        // Loop over the SFXFootstep
                        this.SFXFootstep.play('', 0, 0.4, false, false);   
                    }
                }
            }            
            
        /**
         * Enemy animations
         */
        this.enemies.forEach(this.enemyAnimations, this);
         
         
        /**
         * Camera
         */
         // Setting up the camera to focus on the player
         if(this.player){
            game.camera.follow(this.player); 
         }
        
        
    },
    killEnemies: function(enemy){
           
            enemy.kill();
            this.enemyGenerator(112, 44, 'left');
        
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
    },
    win: function(){
        // Stops the music
        this.music.stop();
        // Starts the game state
        game.state.start('win');
    },
    swiped: function(){
        if(this.player.body.touching.down){
           this.player.body.velocity.y = -480;
                // SFX sound for jumping
                if(this.mute == false){
                    this.SFXJump.play('', 0, 0.3);
                }
            }
        }
    
};
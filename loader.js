var loaderState = {
    preload: function () {
        
        
        // Adding a loading text onto the screen
        var loadingLabel = game.add.text(80, 150, 'loading...', 
                                        {font: '30px Courier', fill: '#ffffff'});
        
        
        // load all game assets
        // images, spritesheets, atlases, audio etc..
        game.load.tilemap('myTilemap', 'assets/tilemaps/scifi.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('myTileset', "assets/tilemaps/scifi_platformTiles_32x32.png");
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('skeleton', 'assets/skeleton_3.png', 64, 64);
        game.load.image('bg', 'assets/scifi_platform_BG1.jpg');
        game.load.image('treasure', 'assets/star2.png');
    },
    create: function () {
        //call next state - change game to MainMenu when development complete
        game.state.start('menu');
    }
};
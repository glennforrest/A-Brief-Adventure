var menuState = {
    create: function () {
        // Here we display the menu items, so text as well as any image needed. Background image the
        // same as the loader?
        
        var titleLabel = game.add.text(80, 80, 'Platformer', 
                                        {font:'50px Arial', fill:'#ffffff'});
        var instructionsLabel = game.add.text(80, 80, 'press the "up" key to start', 
                                        {font:'25px Arial', fill:'#ffffff'});                                

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

        wKey.onDown.addOnce(this.start, this);
    },
    start: function () {
            game.state.start('game');
    }
};
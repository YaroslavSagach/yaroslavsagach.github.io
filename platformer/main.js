// We create our only state, called 'mainState'
var mainState = {

    // We define the 3 default Phaser functions

    preload: function() {
        // This function will be executed at the beginning
           // That's where we load the game's assets
    },

    create: function() { 
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    update: function() {
        // This function is called 60 times per second 
        // It contains the game's logic
    },

    // And here we will later add some of our own functions
};
// Create a 500px by 340px game in the 'gameDiv' element of the index.html
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
// Add the 'mainState' to Phaser, and call it 'main'
game.state.add('main', mainState);
game.state.start('main');
// We create our only state, called 'mainState'
var mainState = {

    // We define the 3 default Phaser functions

    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the game's assets
		game.load.image('player', 'assets/player.png');
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');
    },

    create: function() { 
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.centerX = 250;
		game.world.centerY = 170;
		
		this.createWorld();
		
		this.player.anchor.setTo(0.5, 0.5);
		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
		// Tell Phaser that the player will use the Arcade physics engine
		game.physics.arcade.enable(this.player); 

		// Add vertical gravity to the player
		this.player.body.gravity.y = 500;
		
		this.cursor = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        // This function is called 60 times per second 
        // It contains the game's logic
		// Tell Phaser that the player and the walls should collide
		game.physics.arcade.collide(this.player, this.walls);
		this.movePlayer();
    },
	createWorld: function() {
		// Create our wall group with Arcade physics
		this.walls = game.add.group();
		this.walls.enableBody = true;

		// Create the 10 walls 
		game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
		game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right

		game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
		game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
		game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
		game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right

		game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
		game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right

		var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
		middleTop.scale.setTo(1.5, 1);
		var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1.5, 1);

		// Set all the walls to be immovable
		this.walls.setAll('body.immovable', true);
	},
	movePlayer: function() {
		// If the left arrow key is pressed
		if (this.cursor.left.isDown) {
			// Move the player to the left
			this.player.body.velocity.x = -200;
		}

		// If the right arrow key is pressed
		else if (this.cursor.right.isDown) {
			// Move the player to the right
			this.player.body.velocity.x = 200;
		}

		// If neither the right or left arrow key is pressed
		else {
			// Stop the player
			this.player.body.velocity.x = 0;
		}

		// If the up arrow key is pressed and the player is touching the ground
		if (this.cursor.up.isDown &amp;&amp; this.player.body.touching.down) {
			// Move the player upward (jump)
			this.player.body.velocity.y = -320;
		}      
	},
};
// Create a 500px by 340px game in the 'gameDiv' element of the index.html
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
// Add the 'mainState' to Phaser, and call it 'main'
game.state.add('main', mainState);
game.state.start('main');
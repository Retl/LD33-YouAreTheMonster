ld33 = {};

// For setting velocity.
ld33.pixelsPerSecond = function (px) {
  return px * 60;
}

// For setting acceleration.
ld33.pixelsPerSecondSquared = function (px) {
  return px * 60 * 60;
}

var game = new Phaser.Game(400, 240, Phaser.AUTO, 'ld33-game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ui', 'img/chaser-ui-154x64.png');
    game.load.image('fx', 'img/chaser-fx-154x64.png');
    game.load.image('sq', 'img/chaser-sq-154x64.png');
    game.load.image('background', 'assets/games/starstruck/background2.png');

}

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //bg = game.add.tileSprite(0, 0, 800, 600, 'background');

    game.physics.arcade.gravity.y = 300;

    player = game.add.sprite(32, 160, 'ui');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.anchor.x = 0.5;
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;
    player.body.maxVelocity.y = 500;
    //player.body.setSize(20, 32, 5, 16);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jumpAltButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);

}

function update() {

    // game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            //player.animations.play('left');
            player.scale.x = -1;
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.scale.x = 1;
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            //player.animations.stop();

            if (facing == 'left')
            {
                //player.frame = 0;
            }
            else
            {
                //player.frame = 5;
            }

            facing = 'idle';
        }
    }

    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = ld33.pixelsPerSecond(-10);
        jumpTimer = game.time.now + 750;
    }

}

function render () {

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    game.debug.bodyInfo(player, 16, 24);

}

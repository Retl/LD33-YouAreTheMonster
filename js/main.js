var LD33 = function () {
  this.scrollSpeed = 4;
  this.scrollSpeedMax = 16;
  this.dt = 0;
};

LD33.prototype.update = function () {
  this.dt = this.getDT();
};

// For setting velocity.
LD33.prototype.pixelsPerSecond = function (px) {
  return px * 60;
}

// For setting acceleration.
LD33.prototype.pixelsPerSecondSquared = function (px) {
  return px * 60 * 60;
};

LD33.prototype.scrollBG = function () {
  //bg.position.x -= Math.floor(this.scrollSpeed);
  bg.body.velocity.x = -ld.pixelsPerSecond(this.scrollSpeed);
  if (bg.position.x <= -400) {bg.position.x += 400}
};

LD33.prototype.getDT = function () {
  return game.time.elapsed/1000;
};

LD33.prototype.speedUpScrollSpeed = function (incr) {
  if (!incr) {incr = 1/60;}
  if (this.scrollSpeed <= this.scrollSpeedMax) {
    this.scrollSpeed += incr * this.dt;
  }
  else
  {
    this.scrollSpeed = this.scrollSpeedMax;
  }
  
};

LD33.prototype.addPlatforms = function () {
  this.platforms = game.add.group();
  for (var i = 0; i < 2; i++)
  {
    var platform;
    platform = game.add.sprite(400 * i, game.world.height, 'road_plat');
    platform.anchor.y = 1;
    game.physics.enable(platform, Phaser.Physics.ARCADE);
    platform.body.allowGravity = false;
    platform.body.immovable = true;
    platform.visible = false;
    this.platforms.add(platform);
  }
};

var ld = new LD33();
var game = new Phaser.Game(720, 240, Phaser.AUTO, 'ld33-game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ui', 'img/chaser-ui-154x64.png');
    game.load.image('fx', 'img/chaser-fx-154x64.png');
    game.load.image('sq', 'img/chaser-sq-154x64.png');
    
    game.load.image('road_plat', 'img/road_platform.png');
    
    game.load.image('background', 'img/bg/bgidea.png');

}

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var btnJump;
var btnJumpAlt;
var btnAttack;
var bg;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    bg = game.add.tileSprite(0, 0, game.world.bounds.width * 2,
    game.world.bounds.height, 'background');
    game.physics.enable(bg, Phaser.Physics.ARCADE);
    bg.body.allowGravity = false;
    bg.body.immovable = true;
    bg.body.maxVelocity.x = ld.pixelsPerSecond(16);

    game.physics.arcade.gravity.y = 300;

    //player = game.add.sprite(32, 160, 'ui');
    allySq = new Character(game.add.sprite(192, 100, 'sq'));
    allyFx = new Character(game.add.sprite(0, 130, 'fx'));
    player = new Character(game.add.sprite(128, 160, 'ui'));
    

    player.sprite.anchor.x = 0.5;
    player.sprite.body.collideWorldBounds = true;
    player.sprite.body.gravity.y = 1000;
    player.sprite.body.maxVelocity.y = 500;
    //player.sprite.body.setSize(20, 32, 5, 16);

    cursors = game.input.keyboard.createCursorKeys();
    btnJumpAlt = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    btnJump = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    btnAttack = game.input.keyboard.addKey(Phaser.Keyboard.X);
    
    ld.addPlatforms();

}

function update() {

  //scrolling BG.
  ld.update();
  ld.scrollBG();
  ld.speedUpScrollSpeed();
    // game.physics.arcade.collide(player, layer);
}

function render () {

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    //game.debug.bodyInfo(player, 16, 24);
    if (player){
        game.debug.text("LIFE: " + player.hp, 16, 24);
        game.debug.text("SPD: " + ld.scrollSpeed.toFixed(2), 16, 48);
    }
}

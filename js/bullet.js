var Bullet = function (spr) {
	this.hp = 1000;
	if (!spr) {spr = game.add.sprite(0, 8, 'bullet');}
	if (!spr.body) {this.initSpritePhysics(spr);}
	this.sprite = spr;
	
  this.initMovementVars();
	this.initTimer();
	//this.hookUpdateToSprite(this.sprite);
	
	//return this;
}

Bullet.prototype.update = function () {
  this.sprite.body.velocity.x = 0;
  
	if (this.hp <= 0) {
		this.hp = 0;
		if (this.sprite.alive) {this.sprite.kill();}
	}
	
  game.physics.arcade.collide(this.sprite, ld.platforms, this.handlePlatformCollision, null, this);
	//this.handleInput();
  this.performHorizontalMovement();
  this.performAttacks();
};

Bullet.prototype.hookUpdateToSprite = function (spr) {
	spr.character = this;
	spr.update = function () {
		this.character.update();
	}
};

// Initiators
Bullet.prototype.initTimer = function () {
	this.timer = game.time.create(false);
	this.timer.start();
};

Bullet.prototype.initMovementVars = function () {
  this.fastFallVelocity = ld.pixelsPerSecond(-4);
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
};

Bullet.prototype.initMovementVarsSq = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 500;
};

Bullet.prototype.initMovementVarsFx = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 300;
};

Bullet.prototype.initMovementVarsEnemy = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 2800*3;
};

Bullet.prototype.initSpritePhysics = function (spr) {
  game.physics.enable(spr, Phaser.Physics.ARCADE);
  spr.anchor.x = 0.5;
  //spr.body.collideWorldBounds = true;
  spr.body.gravity.y = 0;
  spr.body.allowGravity = false;
  spr.body.maxVelocity.y = 500;
};

// Handlers
Bullet.prototype.handleCharacterCollision = function () {
  	//this.canJump = true;
};

// Actions
Bullet.prototype.jump = function () {
  if (this.canJump) {
    this.sprite.body.velocity.y = this.jumpStrength;
    this.canJump = false;
    game.sound.play('sfxJump');
  }
};

Bullet.prototype.fastFall = function () {
  if (this.sprite.body.velocity.y < this.fastFallVelocity){
    this.sprite.body.velocity.y = this.fastFallVelocity;
  }
};

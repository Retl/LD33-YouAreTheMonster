var Character = function (spr) {
	this.hp = 1000;
	if (!spr) {spr = game.add.sprite(32, 160, 'ui');}
	if (!spr.body) {this.initSpritePhysics(spr);}
	this.sprite = spr;
  
  this.canJump = true;
  this.canFire = true;
  this.attacking = false;
  this.attackTarget = null;
  this.weapon = new Weapon();
  this.weapon.owner = this;
	
  this.initMovementVars();
	this.initTimer();
	this.hookUpdateToSprite(this.sprite);
	
	//return this;
}

Character.prototype.update = function () {
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

Character.prototype.hookUpdateToSprite = function (spr) {
	spr.character = this;
	spr.update = function () {
		this.character.update();
	}
};

// Initiators
Character.prototype.initTimer = function () {
	this.timer = game.time.create(false);
	this.timer.start();
};

Character.prototype.initMovementVars = function () {
  this.fastFallVelocity = ld.pixelsPerSecond(-4);
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
};

Character.prototype.initMovementVarsSq = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 500;
  this.weapon.maxBulletCount = 1;
  this.weapon.fireVector.x = ld.pixelsPerSecond(2);
  this.weapon.cooldown = 3000;
  this.weapon.bulletKey = 'barrier';
};

Character.prototype.initMovementVarsFx = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 300;
};

Character.prototype.initMovementVarsEnemy = function () {
	this.moveSpeed = ld.pixelsPerSecond(-5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 2800*3;
  this.weapon.fireVector.x = ld.pixelsPerSecond(-16);
};

Character.prototype.initSpritePhysics = function (spr) {
  game.physics.enable(spr, Phaser.Physics.ARCADE);
  spr.anchor.x = 0.5;
  spr.body.collideWorldBounds = true;
  spr.body.gravity.y = 1000;
  spr.body.maxVelocity.y = 500;
};

// Handlers
Character.prototype.handlePlatformCollision = function () {
  	this.canJump = true;
};

Character.prototype.handleInput = function () {
  /*
    if (cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -this.moveSpeed;

        if (facing != 'left')
        {
            //player.animations.play('left');
            //player.scale.x = -1;
            //facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        this.sprite.body.velocity.x = this.moveSpeed;

        if (facing != 'right')
        {
            this.sprite.scale.x = 1;
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

    if ((btnJump.isDown || btnJumpAlt.isDown) && this.canJump )
    {
      
      this.sprite.body.velocity.y = this.jumpStrength;
      //jumpTimer = game.time.now + 750;
      this.canJump = false;
    }
    
    if (btnAttack.isDown && this.canFire )
    {
      
      this.sprite.body.velocity.y = ld.pixelsPerSecond(-10);
      //jumpTimer = game.time.now + 750;
      this.canJump = false;
    }
    */
}

// Actions
Character.prototype.jump = function () {
  if (this.canJump) {
    this.sprite.body.velocity.y = this.jumpStrength;
    this.canJump = false;
    game.sound.play('sfxJump');
  }
};

Character.prototype.fastFall = function () {
  if (this.sprite.body.velocity.y < this.fastFallVelocity){
    this.sprite.body.velocity.y = this.fastFallVelocity;
  }
};

Character.prototype.attack = function () {
  this.attacking = true;
};

Character.prototype.attackStop = function () {
  this.attacking = false;
  this.weapon.stopFire();
};

Character.prototype.startLeftMove = function () {
  this.moveLeft = true;
};

Character.prototype.startRightMove = function () {
  this.moveRight = true;
};

Character.prototype.stopLeftMove = function () {
  this.moveLeft = false;
};

Character.prototype.stopRightMove = function () {
  this.moveRight = false;
};

// Utilities and Actions

Character.prototype.takeDamage = function (dmg) {
  	this.hp -= dmg;
};

Character.prototype.die = function (dmg) {
  	this.hp = 0;
    game.sound.play('sfxDie');
    this.sprite.kill();
    if (this==player && enemy) {enemy.die();}
    else if (this==enemy && player) {player.die();}
};

Character.prototype.performHorizontalMovement = function () {
  if (this.moveRight){
    this.sprite.body.velocity.x = this.moveSpeed;
  }
  else if (this.moveLeft){
    this.sprite.body.velocity.x = -this.moveSpeed;
  }
};

Character.prototype.performAttacks = function () {
  if (this.attacking){
    this.weapon.fire();
  }
};
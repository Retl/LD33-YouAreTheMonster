var Character = function (spr) {
	this.hp = 1000;
	if (!spr) {spr = game.add.sprite(32, 160, 'ui');}
	if (!spr.body) {this.initSpritePhysics(spr);}
	this.sprite = spr;
  
  this.canJump = true;
  this.canFire = true;
	
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
	this.handleInput();
	
};

Character.prototype.hookUpdateToSprite = function (spr) {
	spr.character = this;
	spr.update = function () {
		this.character.update();
	}
};

Character.prototype.initTimer = function () {
	this.timer = game.time.create(false);
	this.timer.start();
};

Character.prototype.initMovementVars = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
};

Character.prototype.initSpritePhysics = function (spr) {
  game.physics.enable(spr, Phaser.Physics.ARCADE);
  spr.anchor.x = 0.5;
  spr.body.collideWorldBounds = true;
  spr.body.gravity.y = 1000;
  spr.body.maxVelocity.y = 500;
};

Character.prototype.handlePlatformCollision = function () {
  	this.canJump = true;
};

Character.prototype.handleInput = function () {
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
}
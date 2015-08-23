var Bullet = function (spr) {
	this.hp = 1000;
	if (!spr) {spr = game.add.sprite(32, 160, 'ui');}
	if (!spr.body) {game.physics.enable(spr, Phaser.Physics.ARCADE);}
	this.sprite = spr;
  this.canJump = true;
	
	this.initTimer();
	this.hookUpdateToSprite(this.sprite);
	
	//return this;
}

Bullet.prototype.update = function () {
  this.sprite.body.velocity.x = 0;
  
	if (this.hp <= 0) {
		this.hp = 0;
		if (this.sprite.alive) {this.sprite.kill();}
	}
	
  game.physics.arcade.collide(this.sprite, ld.platforms, this.handlePlatformCollision, null, this);
	this.handleInput();
	
};

Bullet.prototype.hookUpdateToSprite = function (spr) {
	spr.character = this;
	spr.update = function () {
		this.Bullet.update();
	}
};

Bullet.prototype.initTimer = function () {
	this.timer = game.time.create(false);
	this.timer.start();
};

Bullet.prototype.handlePlatformCollision = function () {
  	this.canJump = true;
};

Bullet.prototype.handleInput = function () {
    if (cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -150;

        if (facing != 'left')
        {
            //player.animations.play('left');
            //player.scale.x = -1;
            //facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;

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
      
      this.sprite.body.velocity.y = ld.pixelsPerSecond(-10);
      //console.log(this.sprite.body.velocity);
      //jumpTimer = game.time.now + 750;
      this.canJump = false;
    }
    
    if (btnAttack.isDown && this.canFire )
    {
      
      this.sprite.body.velocity.y = ld.pixelsPerSecond(-10);
      //console.log(this.sprite.body.velocity);
      //jumpTimer = game.time.now + 750;
      this.canJump = false;
    }
}
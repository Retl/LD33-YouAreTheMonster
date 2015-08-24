var Weapon = function (spr) {
	
	//if (!spr) {spr = game.add.sprite(32, 160, 'bullet');}
	//if (!spr.body) {this.initSpritePhysics(spr);}
	this.owner = null;
	this.canFire = true;
	this.bulletSprite;
	this.bulletKey = 'bullet';
	this.maxBulletCount = 50;
	this.cooldown = 1000 / 8;
	this.bullets = game.add.group();
	this.fireVector = {'x': 0, 'y': 0};
	this.fireVector.x = ld.pixelsPerSecond(16);
	this.penetrating = false;
	
	this.primeBullets();
	//if (!spr) {spr = game.add.sprite(32, 160, 'bullet');}
	//if (!spr.body) {this.initSpritePhysics(spr);}
	//this.sprite = spr;
	
  this.initMovementVars();
	this.initTimer();
	this.hookUpdateToSprite(this.bullets);
	
	//return this;
}

Weapon.prototype.update = function () {
  /*
	this.sprite.body.velocity.x = 0;
  
	if (this.hp <= 0) {
		this.hp = 0;
		if (this.sprite.alive) {this.sprite.kill();}
	}
	
  game.physics.arcade.collide(this.sprite, ld.platforms, this.handlePlatformCollision, null, this);
	//this.handleInput();
  this.performHorizontalMovement();
  this.performAttacks();
	*/
};

Weapon.prototype.primeBullets = function () {
	for (var i = 0; i < this.maxBulletCount; i++){
		var bullet = game.add.sprite(0, -100, this.bulletKey);
		this.initSpritePhysics(bullet);
		bullet.kill();
		bullet.update = this.bulletUpdate;
		bullet.owner = this.owner;
		this.bullets.add(bullet);
	}
}

Weapon.prototype.fire = function () {
	if (this.canFire) {
		
		for (var i = 0; i < this.maxBulletCount; i++){
			if (this.bullets.children[i].alive) {continue;}
			
			var b = this.bullets.children[i];
			game.sound.play('sfxBulletHit');
			b.revive();
			b.body.velocity.x = this.fireVector.x;
			b.body.velocity.y = this.fireVector.y;
			
			if (this.owner){
				b.position.x = this.owner.sprite.x;
				b.position.y = this.owner.sprite.y;
				
			}
			
			/*
			this.shotTimer = this.timer.loop(this.cooldown, function () {
				this.canFire = true;
				}, this);
				*/
				
			this.shotTimer = this.timer.add(this.cooldown, function () {
				this.canFire = true;
				}, this);
			
			this.canFire = false;
			break;
		}
	}
};

Weapon.prototype.bulletFire = function () {
	this.canFire = true;
	if (this.shotTimer) {
		
	}
};

Weapon.prototype.stopFire = function () {
	this.canFire = true;
	if (this.shotTimer) {
		this.timer.remove(this.shotTimer);
	}
};

Weapon.prototype.hookUpdateToSprite = function (spr) {
	spr.character = this;
	spr.update = function () {
		this.character.update();
		
		this.forEachAlive(
			function (b) {
				if (!b.inCamera){b.kill;}
			}
		);
		
		//console.log(this);
		
		game.physics.arcade.overlap(player.sprite, this, function (spr, b) {
			//console.log(b);
			//console.log(char);
			
			if (b.owner == enemy) {
				game.sound.play('sfxDamage');
				player.takeDamage(5);
				if (!b.penetrating) {b.kill();};
				}
			
		}, null, this);
		
		game.physics.arcade.overlap(allySq.sprite, this, function (spr, b) {
			if (b.owner == enemy) {
				game.sound.play('sfxDamage');
				ally.Sq.takeDamage(5);
				if (!b.penetrating) {b.kill();};
				}
		}, null, this);
		
		game.physics.arcade.overlap(allyFx.sprite, this, function (spr, b) {
			if (b.owner == enemy) {
				game.sound.play('sfxDamage');
				allyFx.takeDamage(5);
				if (!b.penetrating) {b.kill();};
				}
		}, null, this);
		
		game.physics.arcade.overlap(enemy.sprite, this, function (spr, b) {
			if (b.owner != enemy) {
				game.sound.play('sfxDamage');
				enemy.takeDamage(5);
				if (!b.penetrating) {b.kill();};
				}
		}, null, this);
		
	}
};
/*
Weapon.prototype.bulletUpdate = function () {
	if (!this.inCamera){this.kill;}
	console.log(this);
	game.physics.arcade.overlap(player.sprite, this.bullets, function (char, b) {
			game.sound.play('sfxDamage');
			char.takeDamage(2);
			if (!b.penetrating) {b.kill();};
		}, null, this);
};
*/
// Initiators
Weapon.prototype.initTimer = function () {
	this.timer = game.time.create(false);
	this.timer.start();
};

Weapon.prototype.initMovementVars = function () {
  this.fastFallVelocity = ld.pixelsPerSecond(-4);
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
};

Weapon.prototype.initMovementVarsSq = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 500;
};

Weapon.prototype.initMovementVarsFx = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 300;
};

Weapon.prototype.initMovementVarsEnemy = function () {
	this.moveSpeed = ld.pixelsPerSecond(5);
	this.jumpStrength = ld.pixelsPerSecond(-10);
  this.hp = 2800*3;
};

Weapon.prototype.initSpritePhysics = function (spr) {
  game.physics.enable(spr, Phaser.Physics.ARCADE);
  spr.anchor.x = 0.5;
  spr.outOfBoundsKill = true;
  spr.body.gravity.y = 0;
  spr.body.allowGravity = false;
  spr.body.maxVelocity.y = ld.pixelsPerSecond(128);
};

// Handlers
Weapon.prototype.handleCharacterCollision = function () {
  	//this.canJump = true;
};

// Actions
Weapon.prototype.jump = function () {
  if (this.canJump) {
    this.sprite.body.velocity.y = this.jumpStrength;
    this.canJump = false;
    game.sound.play('sfxJump');
  }
};

Weapon.prototype.fastFall = function () {
  if (this.sprite.body.velocity.y < this.fastFallVelocity){
    this.sprite.body.velocity.y = this.fastFallVelocity;
  }
};

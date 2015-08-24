var Input = function () {
	this.pad;

	this.buttonA;
	this.buttonB;
	this.buttonX;
	this.buttonY;
	this.buttonDPadLeft;
	this.buttonDPadRight;
	this.buttonDPadUp;
	this.buttonDPadDown;
	
	this.cursors = game.input.keyboard.createCursorKeys();
	
	this.keyAtk = game.input.keyboard.addKey(Phaser.Keyboard.X);
	this.keyJump = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	this.keyJumpAlt = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);
	
	this.keyScale = game.input.keyboard.addKey(Phaser.Keyboard.S);
	this.keyFullscreen = game.input.keyboard.addKey(Phaser.Keyboard.F);
	
	this.bindPresses();
	this.bindReleases();
	
	this.bindJoyPresses();
	this.bindJoyReleases();
};

Input.prototype.FIXME = function () {
	game.input.gamepad.start();
	pad = game.input.gamepad.pad1;
	pad.addCallbacks(this, { onConnect: addButtons });
}


Input.prototype.bindPresses = function () {
	this.cursors.left.onDown.add(function () {player.startLeftMove();}, player);
	this.cursors.right.onDown.add(function () {player.startRightMove();}, player);
	this.keyJump.onDown.add(function () {player.jump();}, player);
	this.keyAtk.onDown.add(function () {player.attack();}, player);
	
	this.cursors.left.onDown.add(function () {enemy.startLeftMove();}, player);
	this.cursors.right.onDown.add(function () {enemy.startRightMove();}, player);
	this.keyJump.onDown.add(function () {enemy.jump();}, player);
	//this.keyAtk.onDown.add(function () {enemy.attack();}, player);
	

	this.keyScale.onDown.add(ld.changeScaleMode, player);
	this.keyFullscreen.onDown.add(ld.goFullscreen, this);
};

Input.prototype.bindReleases = function () {
	this.cursors.left.onUp.add(function () {player.stopLeftMove();}, player);
	this.cursors.right.onUp.add(function () {player.stopRightMove();}, player);
	this.keyJump.onUp.add(function () {player.fastFall();}, player);
	this.keyAtk.onUp.add(function () {player.attackStop();}, player);
	
	this.cursors.left.onUp.add(function () {enemy.stopLeftMove();}, player);
	this.cursors.right.onUp.add(function () {enemy.stopRightMove();}, player);
	this.keyJump.onUp.add(function () {enemy.fastFall();}, player);
	//this.keyAtk.onUp.add(function () {enemy.attackStop();}, player);
};

Input.prototype.bindJoyPresses = function () {

};

Input.prototype.bindJoyReleases = function () {

};
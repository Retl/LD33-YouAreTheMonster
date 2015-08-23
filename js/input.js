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
	var jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.Z);
	jumpKey.onDown.add(function () {player.jump();}, player);

	var attackKey = this.input.keyboard.addKey(Phaser.Keyboard.X);
	attackKey.onDown.add(function () {player.attack();}, player);
	attackKey.onUp.add(function () {player.attackStop();}, player);

	var scaleKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
	scaleKey.onDown.add(changeScaleMode, player);

	var fullscreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
	fullscreenKey.onDown.add(goFullscreen, this);
};

Input.prototype.bindReleases = function () {
	var jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.Z);
	jumpKey.onDown.add(function () {player.jump();}, player);
	jumpKey.onUp.add(function () {player.fastFall();}, player);

	var attackKey = this.input.keyboard.addKey(Phaser.Keyboard.X);
	attackKey.onDown.add(function () {player.attack();}, player);
	attackKey.onUp.add(function () {player.attackStop();}, player); 

	var scaleKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
	scaleKey.onDown.add(changeScaleMode, player);

	var fullscreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
	fullscreenKey.onDown.add(goFullscreen, this);
};

Input.prototype.bindJoyPresses = function () {
	var jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.Z);
	jumpKey.onDown.add(function () {player.jump();}, player);

	var attackKey = this.input.keyboard.addKey(Phaser.Keyboard.X);
	attackKey.onDown.add(function () {player.attack();}, player);
	attackKey.onUp.add(function () {player.attackStop();}, player);

	var scaleKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
	scaleKey.onDown.add(changeScaleMode, player);

	var fullscreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
	fullscreenKey.onDown.add(goFullscreen, this);
};

Input.prototype.bindJoyReleases = function () {
	var jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.Z);
	jumpKey.onDown.add(function () {player.jump();}, player);
	jumpKey.onUp.add(function () {player.fastFall();}, player);

	var attackKey = this.input.keyboard.addKey(Phaser.Keyboard.X);
	attackKey.onDown.add(function () {player.attack();}, player);
	attackKey.onUp.add(function () {player.attackStop();}, player); 

	var scaleKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
	scaleKey.onDown.add(changeScaleMode, player);

	var fullscreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
	fullscreenKey.onDown.add(goFullscreen, this);
};
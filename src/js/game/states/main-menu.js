var context = require("../context");
var saveData = require("../save-data");

var mainMenu = {};

mainMenu.create = function() {
  this.game.stage.backgroundColor = "#000000";

  // this.rain = this.add.emitter(this.game.width / 2, -400, 400);
  // this.rain.width = this.world.width + 100;
  // this.rain.angle = 30;
  // this.rain.minParticleScale = 2;
  // this.rain.maxParticleScale = 3;
  // this.rain.setYSpeed(200, 600);
  // this.rain.setXSpeed(5, 15);
  // this.rain.minRotation = 0;
  // this.rain.maxRotation = 0;
  // this.rain.makeParticles("rain");
  // this.rain.start(false, 1200, 5, 0);

  this.logo = this.add.sprite(this.game.width / 2, 80, "game-logo");
  this.logo.anchor.set(0.5);
  this.logo.scale.set(2);

  this.credits1 = this.add.bitmapText(
    this.game.width / 2,
    390,
    "font1",
    "The game has been developed by GLITCHMAN\nspecially for LD42 COMPO. © 2018\ntwitter.com/aglitchman",
    12
  );
  this.credits1.align = "center";
  this.credits1.scale.set(2);
  this.credits1.anchor.x = 0.5;

  this.btnStart = this.add.button(
    this.game.width / 2,
    200,
    "btn-start",
    this._newGame,
    this,
    1,
    0,
    0,
    1
  );
  this.btnStart.scale.set(2);
  this.btnStart.anchor.x = 0.5;

  this.btnContinue = this.add.button(
    this.game.width / 2,
    200,
    "btn-continue",
    this._continueGame,
    this,
    1,
    0,
    0,
    1
  );
  this.btnContinue.scale.set(2);
  this.btnContinue.anchor.x = 0.5;
  this.btnContinue.visible = false;

  this.btnTwoPlayer = this.add.button(
    this.game.width / 2,
    260,
    "btn-twoplayer",
    this._twoPlayerGame,
    this,
    1,
    0,
    0,
    1
  );
  this.btnTwoPlayer.scale.set(2);
  this.btnTwoPlayer.anchor.x = 0.5;

  if (saveData.saved) {
    this.btnContinue.visible = true;
    this.btnStart.y += 60;
    this.btnTwoPlayer.y += 60;

    this.btnContinue.y -= 20;
    this.btnStart.y -= 20;
    this.btnTwoPlayer.y -= 20;
  }

  this._yoyoBounce(this.logo);

  this._fadeOut();
};

mainMenu.update = function() {};

mainMenu._newGame = function() {
  if (this._blackBgTween.isRunning) return; // Otherwise accidental clicks occur after Intro

  context.twoPlayerMode = false;

  saveData.reset();
  saveData.save();

  this.state.start("gameIntro1");
};

mainMenu._continueGame = function() {
  if (this._blackBgTween.isRunning) return; // Otherwise accidental clicks occur after Intro

  context.twoPlayerMode = false;

  if (saveData.tutorial) {
    this.state.start("gameIntro1");
  } else {
    this.state.start("gameMap");
  }
};

mainMenu._twoPlayerGame = function() {
  if (this._blackBgTween.isRunning) return; // Otherwise accidental clicks occur after Intro

  context.twoPlayerMode = true;
  context.playedLevelNum = ((Math.random() * 5) | 0) + 1;

  this.state.start("gameCore");
};

mainMenu._yoyoBounce = function(obj) {
  var tween = this.add
    .tween(obj.scale)
    .to({ x: 2 * 1.2 }, 700, "Elastic", true, 0, -1);
  tween.yoyo(true, 0);

  tween = this.add
    .tween(obj.scale)
    .to({ y: 2 * 1.2 }, 700, "Bounce", true, 0, -1);
  tween.yoyo(true, 0);
};

mainMenu._fadeOut = function() {
  this._blackBg = this.add.sprite(0, 0, "black-bg");
  this._blackBg.scale.set(20);
  this._blackBg.fixedToCamera = true;
  this._blackBgTween = this.add
    .tween(this._blackBg)
    .to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true)
    .onComplete.addOnce(function() {
      this._blackBg.visible = false;
    }, this);
};

module.exports = mainMenu;

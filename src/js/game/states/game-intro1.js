var context = require("../context");

var gameIntro1 = {};

gameIntro1.create = function() {
  this.game.stage.backgroundColor = "#000000";

  this.logo = this.add.sprite(
    this.world.centerX,
    this.world.centerY,
    "city-logo"
  );
  this.logo.anchor.set(0.5);
  this.logo.scale.set(2);
  this.logo.alpha = 0;

  this.add
    .tween(this.logo)
    .to(
      {
        alpha: 1
      },
      400,
      Phaser.Easing.Linear.None,
      true,
      1000
    )
    .onComplete.add(this._fadeLogo, this);
};

gameIntro1.update = function() {};

gameIntro1._fadeLogo = function() {
  this.add
    .tween(this.logo)
    .to(
      {
        alpha: 0
      },
      400,
      Phaser.Easing.Linear.None,
      true,
      1500
    )
    .onComplete.add(this._transNextState, this);
};

gameIntro1._transNextState = function() {
  this.time.events.add(500, this._nextState, this);
};

gameIntro1._nextState = function() {
  this.state.start("gameIntro2");
};

module.exports = gameIntro1;
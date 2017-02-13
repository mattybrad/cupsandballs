import React from 'react';

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

export default class Randomspiel extends React.Component {

  componentDidMount() {
    var game = new Phaser.Game(760, 600, Phaser.AUTO, this.refs.phaserDiv);
    var game_state = {};

    game_state.main = function() { };
    game_state.main.prototype = {

      preload: function() {
        game.load.image('ball', '/assets/images/ball.png');
      },

      create: function()  {
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 2000;
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 1;

        var ballCollisionGroup = game.physics.p2.createCollisionGroup();
        var pinCollisionGroup = game.physics.p2.createCollisionGroup();

        game.physics.p2.updateBoundsCollisionGroup();

        this.ball = game.add.sprite(300, -50, 'ball');
        game.physics.p2.enable(this.ball);
        this.ball.body.fixedRotation = true;
        this.ball.body.setCollisionGroup(ballCollisionGroup);
        this.ball.body.collides(pinCollisionGroup);

        var pins = game.add.group();
        pins.enableBody = true;
        pins.physicsBodyType = Phaser.Physics.P2JS;
        for(var i = 0; i < 30; i ++) {
          var pin = pins.create(Math.random() * 800, Math.random() * 500, 'ball');
          pin.body.setRectangle(50,50);
          pin.body.static = true;
          pin.body.setCollisionGroup(pinCollisionGroup);
          pin.body.collides(ballCollisionGroup);
        }
      },

      update: function() {

      }
    };

    game.state.add('main', game_state.main);
    game.state.start('main');
  }

  render() {
    return(
      <div ref="phaserDiv"></div>
    )
  }
}

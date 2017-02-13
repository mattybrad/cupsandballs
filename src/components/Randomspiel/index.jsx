import React from 'react';

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

export default class Randomspiel extends React.Component {

  componentDidMount() {
    var game = new Phaser.Game(760, 600, Phaser.AUTO, this.refs.phaserDiv);
    var game_state = {};
    var balls;
    var pins;

    game_state.main = function() { };
    game_state.main.prototype = {

      preload: function() {
        game.load.image('ball', '/assets/images/ball.png');
      },

      create: function()  {
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 2000;
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0.3;

        var ballCollisionGroup = game.physics.p2.createCollisionGroup();
        var pinCollisionGroup = game.physics.p2.createCollisionGroup();

        //game.physics.p2.updateBoundsCollisionGroup();

        // ball = game.add.sprite(game.width / 2, 10, 'ball');
        // game.physics.p2.enable(ball);
        // this.resetBall();
        // ball.body.setCircle(25);
        // ball.body.setCollisionGroup(ballCollisionGroup);
        // ball.body.collides(pinCollisionGroup);

        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.P2JS;
        for(var i = 0; i < 10; i ++) {
          var ball = balls.create(
            100 + i * 100,
            0,
            'ball'
          );
          ball.body.setCircle(25);
          ball.body.setCollisionGroup(ballCollisionGroup);
          ball.body.collides([pinCollisionGroup,ballCollisionGroup]);
        }

        pins = game.add.group();
        pins.enableBody = true;
        pins.physicsBodyType = Phaser.Physics.P2JS;
        var pinGroupHeight = 0.7; // fraction of overall height
        var pinGroupTopSpace = 0.15; // fraction of overall height
        var cols = 10;
        var rows = 8;
        var oddRow;
        for(var i = 0; i < rows; i ++) {
          oddRow = !!(i%2);
          for(var j = 0; j < (oddRow ? cols : cols - 1); j ++) {
            var pin = pins.create(
              (oddRow ? j+1 : j+1.5) * game.width / (cols + 1),
              pinGroupTopSpace * game.height + i * pinGroupHeight * game.height / (rows - 1),
              'ball'
            );
            pin.scale.set(0.2);
            pin.body.setCircle(5);
            pin.body.static = true;
            pin.body.setCollisionGroup(pinCollisionGroup);
            pin.body.collides(ballCollisionGroup);
          }
        }
      },

      resetBall(ball) {
        ball.body.y = 10;
        ball.body.x = game.width / 2 + 5 * (1-Math.random());
        ball.body.velocity.x = ball.body.velocity.y = 0;
      },

      update: function() {
        balls.forEach(function(ball){
          if(ball.body.y > 600) {
            this.resetBall(ball);
          }
        }.bind(this))
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

import React from 'react';
import Oscillator from '../Oscillator';

export default class Randomspiel extends React.Component {

  componentDidMount() {
    require.ensure([], () => {
      var PhaserLoader = require('../PhaserLoader');

      var game = new Phaser.Game(this.props.width, this.props.height, Phaser.AUTO, this.refs.phaserDiv);
      var game_state = {};
      var balls;
      var pins;
      var ballCollisionGroup;
      var pinCollisionGroup;

      game_state.main = function() { };
      game_state.main.prototype = {

        preload: function() {
          game.load.image('ball', '/assets/images/ball.png');
        },

        create: function()  {
          game.physics.startSystem(Phaser.Physics.P2JS);
          game.physics.p2.gravity.y = 1500;
          game.physics.p2.setImpactEvents(true);
          game.physics.p2.restitution = 0.3;

          ballCollisionGroup = game.physics.p2.createCollisionGroup();
          pinCollisionGroup = game.physics.p2.createCollisionGroup();

          balls = game.add.group();
          balls.enableBody = true;
          balls.physicsBodyType = Phaser.Physics.P2JS;
          this.generateBall();
          window.genLoop = game.time.events.loop(0.1 * Phaser.Timer.SECOND, this.generateBall, this);

          pins = game.add.group();
          pins.enableBody = true;
          pins.physicsBodyType = Phaser.Physics.P2JS;
          this.generatePins(10, 5);
          window.genPins = this.generatePins;
        },

        generatePins(cols, rows) {
          pins.removeAll(true);
          var pinGroupHeight = 0.7; // fraction of overall height
          var pinGroupTopSpace = 0.15; // fraction of overall height
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

        generateBall() {
          var ball = balls.create(0, 0, 'ball');
          ball.body.y = -50;
          ball.body.x = game.width / 2 + 100 * (0.5-Math.random());
          ball.body.velocity.x = ball.body.velocity.y = 0;
          ball.body.setCircle(25);
          ball.body.setCollisionGroup(ballCollisionGroup);
          ball.body.collides([pinCollisionGroup,ballCollisionGroup]);
        },

        update: function() {
          balls.forEach(function(ball){
            if(ball.body.y > game.height) {
              var o = new Oscillator(window.actx);
              balls.remove(ball, true);
            }
          }.bind(this))
        }
      };

      game.state.add('main', game_state.main);
      game.state.start('main');
    })
  }

  render() {
    return(
      <div ref="phaserDiv"></div>
    )
  }
}

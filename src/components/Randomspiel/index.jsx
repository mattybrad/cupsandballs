import React from 'react';
import Oscillator from '../Oscillator';
import * as Actions from '../../actions/SoundToyActions';
import { connect } from 'react-redux';
import SketchFrame from '../SketchFrame';

const mapStateToProps = (state) => {
  return {
		cols: state.SoundToy.randomspiel.cols,
		rows: state.SoundToy.randomspiel.rows,
    ballRate: state.SoundToy.randomspiel.ballRate,
    ballSize: state.SoundToy.randomspiel.ballSize
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class RandomspielComponent extends React.Component {

  componentDidMount() {
    require.ensure([], () => {
      var PhaserLoader = require('../PhaserLoader');
      this.startGame();
    })
  }

  startGame() {
    var game = new Phaser.Game(this.props.width, this.props.height, Phaser.AUTO, this.refs.phaserDiv);
    var game_state = {};

    this.game = game;
    this.gameState = game_state;

    var balls;
    var pins;
    var ballCollisionGroup;
    var pinCollisionGroup;
    var component = this;

    game_state.main = function() { };
    game_state.main.prototype = {

      preload: function() {
        game.load.image('ball', '/assets/images/ball.png');
      },

      create: function()  {
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 1000;
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0.3;

        ballCollisionGroup = game.physics.p2.createCollisionGroup();
        pinCollisionGroup = game.physics.p2.createCollisionGroup();

        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.P2JS;
        this.generateBall();
        component.genLoop = game.time.events.loop(60 * Phaser.Timer.SECOND / component.props.ballRate, this.generateBall, this);

        pins = game.add.group();
        pins.enableBody = true;
        pins.physicsBodyType = Phaser.Physics.P2JS;
        this.generatePins(component.props.cols, component.props.rows);
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
            pin.scale.set(0.1);
            pin.body.setCircle(2.5);
            pin.body.static = true;
            pin.body.setCollisionGroup(pinCollisionGroup);
            pin.body.collides(ballCollisionGroup);
          }
        }
      },

      generateBall() {
        var ball = balls.create(0, 0, 'ball');
        var ballSize = 100 * Math.pow(component.props.ballSize / 100, 2);
        ball.body.y = -ballSize;
        ball.body.x = game.width / 2 + 100 * (0.5-Math.random());
        ball.body.velocity.x = ball.body.velocity.y = 0;
        ball.body.setCircle(ballSize / 2);
        ball.scale.setTo(ballSize / 50);
        ball.body.setCollisionGroup(ballCollisionGroup);
        ball.body.collides([pinCollisionGroup,ballCollisionGroup]);
      },

      update: function() {
        var notes = [0,2,4,5,7,9,11,12,14,16,17,19,21,23];
        balls.forEach(function(ball){
          if(ball.body.y > game.height) {
            var o = new Oscillator(
              window.actx,
              40 + notes[Math.floor(notes.length * Math.min(0.99,Math.max(0,ball.body.x/game.width)))]
            );
            balls.remove(ball, true);
          }
        })
      }
    };

    game.state.add('main', game_state.main);
    game.state.start('main');
  }

  componentDidUpdate(prevProps) {
    if(prevProps.rows != this.props.rows || prevProps.cols != this.props.cols) {
      this.gameState.main.prototype.generatePins(this.props.cols, this.props.rows);
    }
    if(prevProps.ballRate != this.props.ballRate && this.genLoop) {
      this.genLoop.delay = 60 * Phaser.Timer.SECOND / this.props.ballRate;
    }
  }

  componentWillUnmount() {
    if(this.game) this.game.destroy();
  }

  render() {
    return(
      <SketchFrame width={this.props.width} height={this.props.height}>
        <div ref="phaserDiv"></div>
      </SketchFrame>
    )
  }
}

const Randomspiel = connect(
  mapStateToProps,
  mapDispatchToProps
)(RandomspielComponent);

export default Randomspiel;

import React from 'react';

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

export default class Test extends React.Component {

  componentDidMount() {
    var game = new Phaser.Game(760, 600, Phaser.AUTO, this.refs.phaserDiv);
    var game_state = {};

    // Creates a new 'main' state that wil contain the game
    game_state.main = function() { };
    game_state.main.prototype = {

      preload: function() {
  		// Function called first to load all the assets
          game.load.image('hello', '/assets/images/pluto.png');
      },

      create: function() {
      	// Fuction called after 'preload' to setup the game
          this.hello_sprite = game.add.sprite(250, 300, 'hello');
      },

      update: function() {
  		// Function called 60 times per second
          this.hello_sprite.angle += 1;
      }
    };

    // Add and start the 'main' state to start the game
    game.state.add('main', game_state.main);
    game.state.start('main');
  }

  render() {
    return(
      <div ref="phaserDiv"></div>
    )
  }
}

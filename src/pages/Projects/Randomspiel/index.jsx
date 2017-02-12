import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
import MusicDefinition from '../../../components/MusicDefinition';
import musicDef from './musicDef';

export default class Project extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Test: null
    }
  }

  componentDidMount() {
    require.ensure([], () => {
      var Test = require('../../../components/Test');
      setTimeout(function() {
        this.setState({
          Test: Test
        })
      }.bind(this), 2000);
    })
  }

  componentDidUpdate() {
    console.log(this.state.Test.default);
  }

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#AAAA00' secondaryColor='#009900' />
        <MusicDefinition musicDef={musicDef} />
        <h1>Randomspiel</h1>
        <p>This project was originally meant to be a big, real-life musical instrument. The instrument would consist of a hopper full of marbles cascading down a vertical board full of nails, with the marbles hitting random glockenspiel tines at the bottom.</p>
        <p>The idea was to replicate the {"random arpeggio"} function of a synthesizer without the use of a computer, partly because I was interested in the way that computers are oddly bad at generating random numbers, but mainly because it seemed like a fun thing to do.</p>
        <p>The project proved too ambitious at the time, but I did salvage something from it in the form of an interactive simulation, which can be played with below.</p>
        {this.state.Test?<this.state.Test.default />:null}
      </div>
    )
  }
}

Project.shortcode = "randomspiel";
Project.title = "Randomspiel";
Project.description = "A virtual sound toy wherein marbles bounce onto a glockenspiel"

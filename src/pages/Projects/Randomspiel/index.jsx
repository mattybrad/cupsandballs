import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
import MusicDefinition from '../../../components/MusicDefinition';
import musicDef from './musicDef';

export default class Project extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    require.ensure([], () => {
      var Randomspiel = require('../../../components/Randomspiel');
      this.setState({
        Randomspiel: Randomspiel.default
      })
    })
  }

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#000033' secondaryColor='#000099' />
        <MusicDefinition musicDef={musicDef} />
        <h1>Randomspiel</h1>
        {
          this.state.Randomspiel?
          <this.state.Randomspiel width={740} height={400} />:
          <div>Loading simulation...</div>
        }
        <p>This project was originally meant to be a big, real-life musical instrument. The instrument would consist of a hopper full of marbles cascading down a vertical board full of nails, with the marbles hitting random glockenspiel tines at the bottom.</p>
        <p>The idea was to replicate the {"random arpeggio"} function of a synthesizer without the use of a computer, partly because I was interested in the way that computers are oddly bad at generating random numbers, but mainly because it seemed like a fun thing to do.</p>
        <p>The project proved too ambitious at the time, but I did salvage something from it in the form of an interactive simulation, which can be played with below.</p>
      </div>
    )
  }
}

Project.shortcode = "randomspiel";
Project.title = "Randomspiel";
Project.description = "A virtual sound toy wherein marbles bounce onto a glockenspiel"

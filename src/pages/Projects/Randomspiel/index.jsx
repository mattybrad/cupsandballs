import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
import MusicDefinition from '../../../components/MusicDefinition';
import musicDef from './musicDef';
import SoundToy from '../../../components/SoundToy';
import NumberInput from '../../../components/NumberInput';
import * as Actions from '../../../actions/SoundToyActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSoundToy: (toy, vars) => {
      dispatch(Actions.updateSoundToy(toy, vars));
    }
  }
}

class ProjectComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onValueChange(key,ev) {
    var obj = {};
    obj[key] = ev.target.value;
    this.props.updateSoundToy("randomspiel", obj);
  }

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#550033' secondaryColor='#550099' />
        <MusicDefinition musicDef={musicDef} />
        <h1>Randomspiel</h1>
        <SoundToy toy="randomspiel" width={760} height={400} />
        <br/>
        <div>
          <NumberInput label="Columns" defaultValue={25} min={2} max={50} onChange={this.onValueChange.bind(this,"cols")} />
          <NumberInput label="Rows" defaultValue={15} min={2} max={50} onChange={this.onValueChange.bind(this,"rows")} />
          <NumberInput label="Ball rate" unit=" per minute" defaultValue={60} min={1} max={1000} onChange={this.onValueChange.bind(this,"ballRate")} />
          <NumberInput label="Ball size" unit="%" defaultValue={40} min={1} max={100} onChange={this.onValueChange.bind(this,"ballSize")} />
        </div>
        <p>This project was originally meant to be a big, real-life musical instrument. The instrument would consist of a hopper full of marbles cascading down a vertical board full of nails, with the marbles hitting random glockenspiel tines at the bottom.</p>
        <p>The idea was to replicate the {"random arpeggio"} function of a synthesizer without the use of a computer, partly because I was interested in the way that computers are oddly bad at generating random numbers, but mainly because it seemed like a fun thing to do.</p>
        <p>The project proved too ambitious at the time, but I did salvage something from it in the form of an interactive simulation, which can be played with below.</p>
      </div>
    )
  }
}

const Project = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectComponent);

export default Project;

Project.shortcode = "randomspiel";
Project.title = "Randomspiel";
Project.description = "A virtual sound toy wherein marbles bounce onto a glockenspiel";

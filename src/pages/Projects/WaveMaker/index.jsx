import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
import SoundToy from '../../../components/SoundToy';
import NumberInput from '../../../components/NumberInput';
import * as Actions from '../../../actions/SoundToyActions';
import { connect } from 'react-redux';
import styles from './index.css';
import ExampleEquation from './ExampleEquation';

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

export default class Project extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#660000' secondaryColor='#CC0066' />
        <h1>Wave Maker</h1>
        <SoundToy ref="wavemaker" toy="wavemaker" />
        <p>This sound toy allows you to turn equations into sound. Enter an equation, press the button, and see what happens.</p>
        <p>You can enter equations in the same way you would on a graphical calculator. The variable t represents time. To get you started, try clicking on some of the example functions below, or go to the <a href="http://mathjs.org/docs/expressions/syntax.html" target="_blank">mathjs documentation page</a> (the library that this page uses to parse formulae) to see the full range of operators available.</p>
        <ExampleEquation equation="sin(2*pi*440*t)">
          {"A simple sine wave at 440Hz (an A note on a piano)."}
        </ExampleEquation>
        <ExampleEquation equation="(sin(2*pi*440*t)+sin(2*pi*554.365*t))/2">
          {"Two sine waves added together, one at A and one at C#, giving a major third harmony. The amplitude is divided by two to prevent clipping (going beyond the maxmimum volume)."}
        </ExampleEquation>
        <ExampleEquation equation="sin(2*pi*440*t)*(1-t/L)">
          {"Rather than being a constant sine wave, this one fades out over time. The constant L is used to refer to the duration of the sound."}
        </ExampleEquation>
      </div>
    )
  }
}

Project.shortcode = "wavemaker";
Project.title = "Wave Maker";
Project.description = "An interactive expression evaluator";

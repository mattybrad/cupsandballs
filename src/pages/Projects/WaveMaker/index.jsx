import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
import SoundToy from '../../../components/SoundToy';
import NumberInput from '../../../components/NumberInput';
import * as Actions from '../../../actions/SoundToyActions';
import { connect } from 'react-redux';
import styles from './index.css';

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

  onValueChange(key,newValue) {
    var obj = {};
    obj[key] = newValue;
    this.props.updateSoundToy("randomspiel", obj);
  }

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#660000' secondaryColor='#CC0066' />
        <h1>Wave Maker</h1>
        <SoundToy toy="wavemaker" width={760} height={400} />
        <p>This sound toy allows you to turn equations into sound. Enter an equation, click "listen", and see what happens.</p>
        <p>You can use any of the basic mathematical operators (add, subtract, multiply, divide), as well as functions that generate waves, such as "sin" (sine) and "cos" (cosine). The full list of available methods is as follows:</p>
        <div className={classNames(styles.docs)}>
          <h1>+</h1><p>Add numbers together.</p>
          <h1>-</h1><p>Subtract one number from another.</p>
          <h1>× or *</h1><p>Multiply two numbers together.</p>
          <h1>÷ or /</h1><p>Divide one number by another.</p>
          <h1>sin(x)</h1><p>The sine of a number in radians.</p>
          <h1>cos(x)</h1><p>The cosine of a number in radians.</p>
        </div>
      </div>
    )
  }
}

const Project = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectComponent);

export default Project;

Project.shortcode = "wavemaker";
Project.title = "Wave Maker";
Project.description = "An interactive expression evaluator";

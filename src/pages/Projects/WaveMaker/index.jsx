import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
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

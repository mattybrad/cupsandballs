import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';

export default class Project extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#FF9900' secondaryColor='#CC0000' />
        <h1>Walkman Synth</h1>
        <p></p>
      </div>
    )
  }
}

Project.shortcode = "walkmansynth";
Project.title = "Walkman Synth";
Project.description = "An musical instrument based on a modified portable cassette player"

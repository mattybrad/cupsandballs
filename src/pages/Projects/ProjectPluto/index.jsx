import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
import AudioPlayer from '../../../components/AudioPlayer';

export default class Project extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#AAAAAA' secondaryColor='#CC9900' image='pluto.png' />
        <h1>Project Pluto</h1>
        <p>On July 14th, 2015, a group of very clever NASA scientists celebrated as the New Horizons probe flew within a few thousand miles of the dwarf planet Pluto. On the same day, a group of Oxford musicians and poets met in my living room to create a piece of music/poetry to mark the occasion.</p>
        <p>The {"rules"} of the piece were that everything had to be performed and recorded on the day of the flyby.</p>
        <AudioPlayer title="Project Pluto" src="/assets/audio/projectpluto/project_pluto.mp3" />
      </div>
    )
  }
}

Project.shortcode = "projectpluto";
Project.title = "Project Pluto";
Project.description = "A collaborative piece of music/poetry to celebrate NASA's flyby of Pluto"

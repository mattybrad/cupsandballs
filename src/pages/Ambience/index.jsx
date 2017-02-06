import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';
import MusicDefinition from '../../components/MusicDefinition';
import musicDef from './musicDef';

export default class About extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#ccff00' secondaryColor='#cc0000' />
        <MusicDefinition musicDef={musicDef} />
        <h1>Ambience</h1>
          <p>I wanted this website to be fun, nerdy and interactive, rather than slick and minimalistic. To this end, there are a few optional features (animated background, algorithmic muzak, etc) that you won't find on most sites. If you would like to disable any of these features for a more relaxing browsing experience, you can do so below.</p>
          <p>Click here to disable all extra features</p>
          <p>Click here to disable the background music</p>
          <p>Click here to disable the animation background</p>
          <p>Click here to disable the console log</p>
          <p>Click here to disable the DOM preview</p>
      </div>
    )
  }
}

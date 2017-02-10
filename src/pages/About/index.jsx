import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';
import MusicDefinition from '../../components/MusicDefinition';
import musicDef from './musicDef';

export default class About extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#33BB00' secondaryColor='#003333' />
        <MusicDefinition musicDef={musicDef} />
        <h1>About</h1>
        <p>Here is some text.</p>
      </div>
    )
  }
}

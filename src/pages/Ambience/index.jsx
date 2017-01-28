import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';


export default class About extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#ccff00' secondaryColor='#cc0000' />

        <h1>Ambience</h1>
        <p>Here is some text.</p>
      </div>
    )
  }
}

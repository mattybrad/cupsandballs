import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';
import Header from '../../components/Header';

export default class About extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#00ff00' secondaryColor='#ffff00' />
        <Header />
        <h1>About</h1>
        <p>Here is some text.</p>
      </div>
    )
  }
}

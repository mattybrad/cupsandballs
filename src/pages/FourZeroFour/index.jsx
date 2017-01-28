import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';

export default class FourZeroFour extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#333333' secondaryColor='#cccccc' />
        <h1>Page Not Found</h1>
        <p>This page does not exist. It may have existed once.</p>
      </div>
    )
  }
}

import React from 'react';
import classNames from 'classnames';
import CupsAndBalls from '../CupsAndBalls';

export default class Main extends React.Component {

  render() {
    return(
      <div>
        {this.props.children}
        <CupsAndBalls mainAppComponent={this.props.children} />
      </div>
    )
  }
}

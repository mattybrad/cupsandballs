import React from 'react';
import classNames from 'classnames';

export default class Main extends React.Component {

  render() {
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

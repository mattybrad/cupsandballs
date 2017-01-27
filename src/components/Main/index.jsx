import React from 'react';
import classNames from 'classnames';

export default class MainAppOuter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {

  }

  render() {
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

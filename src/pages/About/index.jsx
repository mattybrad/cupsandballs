import React from 'react';
import classNames from 'classnames';
import Header from '../../components/Header';

export default class About extends React.Component {

  render() {
    return(
      <div>
        <Header />
        <h1>About</h1>
        <p>Here is some text.</p>
      </div>
    )
  }
}

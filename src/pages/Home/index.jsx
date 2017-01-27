import React from 'react';
import classNames from 'classnames';
import Header from '../../components/Header';

export default class Home extends React.Component {

  // idea: have loads of different homepage text, randomly selected each time
  render() {
    return(
      <div>
        <Header />
        <h1>{"Matt's website"}</h1>
        <p>My name is Matt and this is my website.</p>
        <p>The site contains text and sound and pictures and information and thoughts, but the container is itself formed of these things, in a way that could be considered gently meta.</p>
        <p>Please feel free to explore.</p>
      </div>
    )
  }
}

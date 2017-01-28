import React from 'react';
import classNames from 'classnames';

export default class Project extends React.Component {

  render() {
    return(
      <div>
        <h1>Randomspiel</h1>
        <p>And then this would be a long page about a project.</p>
      </div>
    )
  }
}

Project.shortcode = "randomspiel";
Project.title = "Randomspiel";
Project.description = "A virtual sound toy wherein marbles bounce onto a glockenspiel"

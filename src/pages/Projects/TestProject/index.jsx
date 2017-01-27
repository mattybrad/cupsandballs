import React from 'react';
import classNames from 'classnames';

export default class TestProject extends React.Component {

  render() {
    return(
      <div>
        <h1>Test Project</h1>
        <p>And then this would be a long page about a project.</p>
      </div>
    )
  }
}

TestProject.title = "Test Project";
TestProject.description = "This could be a description of the project."

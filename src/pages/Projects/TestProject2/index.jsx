import React from 'react';
import classNames from 'classnames';

export default class TestProject2 extends React.Component {

  render() {
    return(
      <div>
        <h1>Test Project</h1>
        <p>And then this would be a long page about a project.</p>
      </div>
    )
  }
}

TestProject2.shortcode = "testproject2";
TestProject2.title = "My Second Project";
TestProject2.description = "This is a description of a second project";

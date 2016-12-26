import React from 'react';

export default class MainApp extends React.Component {
  componentDidMount() {
    this.props.onRender();
  }
  componentDidUpdate() {
    this.props.onRender();
  }

  render() {
    return(
      <div>
        <h1>Main App</h1>
        <p>This is the main app!</p>
        <ul>
          <li>Testing</li>
          <li>Hello</li>
          <li>Hi</li>
        </ul>
      </div>
    )
  }
}

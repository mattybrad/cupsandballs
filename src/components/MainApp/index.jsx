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
      <div>Main App</div>
    )
  }
}

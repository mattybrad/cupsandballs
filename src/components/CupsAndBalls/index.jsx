import React from 'react';
import pretty from 'pretty';
import ReactDOMServer from 'react-dom/server';

export default class CupsAndBalls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prettyHTML: "html..."
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      prettyHTML: pretty(ReactDOMServer.renderToStaticMarkup(nextProps.mainAppComponent))
    })
  }

  render() {
    return(
      <pre>{this.state.prettyHTML}</pre>
    )
  }
}

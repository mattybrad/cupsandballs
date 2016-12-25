import React from 'react';
import ReactDOM from 'react-dom';
//import * as JsDiff from 'diff';
import pretty from 'pretty';

class CodeBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prettyHTML: ""
    }
    setInterval(this.onInterval.bind(this), 100);
  }

  onInterval() {
    var thisHTML = pretty(document.getElementById('app').innerHTML);
    this.setState({
      prettyHTML: thisHTML
    })
  }

  render() {
    return(
      <pre>{this.state.prettyHTML}</pre>
    )
  }
}

ReactDOM.render(<CodeBackground/>, document.getElementById('code'));

import React from 'react';
import ReactDOM from 'react-dom';
import * as JsDiff from 'diff';
import pretty from 'pretty';

class CodeBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionalHTML: ""
    }
    window.requestAnimationFrame(this.onInterval.bind(this));
  }

  onInterval() {
    var thisHTML = pretty(document.getElementById('app').innerHTML);
    var diff = JsDiff.diffChars(this.state.transitionalHTML, thisHTML);
    //var diff = [];
    var output = "";
    var changeDone = false;
    diff.map(function(d){
      if(!d.added&&!d.removed) {
        output += d.value;
      } else if(d.added) {
        if(!changeDone) output += d.value.slice(0, 1);
        changeDone = true;
      } else if(d.removed) {
        output += changeDone ? d.value : d.value.slice(1);
        changeDone = true;
      }
    })
    this.setState({
      transitionalHTML: output
    })
    window.requestAnimationFrame(this.onInterval.bind(this));
  }

  render() {
    return(
      <pre>{this.state.transitionalHTML}</pre>
    )
  }
}

ReactDOM.render(<CodeBackground/>, document.getElementById('code'));

import React from 'react';

export default class CodeBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testList: []
    }
    setInterval(this.onInterval.bind(this), 100);
  }

  onInterval() {
    var currentTestList = this.state.testList.slice();
    currentTestList.push("hello");
    this.setState({
      testList: currentTestList
    })
  }

  render() {
    return(
      <div>
        {this.state.testList.map(function(item){
          return <div>{item}</div>
        })}
      </div>
    )
  }
}

import React from 'react';

export default class CodeBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumber: 0,
      showTitle: false
    }
    setInterval(this.onInterval.bind(this), 3000);
  }

  onInterval() {
    this.setState({
      randomNumber: Math.floor(Math.random() * 10),
      showTitle: !this.state.showTitle
    })
  }

  render() {
    var x = [];
    while(x.length<this.state.randomNumber) x.push(this.state.randomNumber);
    return(
      <div>
        {this.state.showTitle?<h1>Title</h1>:null}
        {x.map(function(n,i){
          return <div key={"x"+i}>Number {n}</div>
        })}
      </div>
    )
  }
}

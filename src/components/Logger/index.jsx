import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class Logger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logs: []
    }
    setInterval(function() {
      if(Math.random()>0.8) {
        //console.log(Math.random()>0.5?"Test: " + Math.random():"Logging...");
      }
    }, 20)
  }

  componentDidMount() {
    var actualLogFunction = window.console.log;
    window.console.log = function() {
      actualLogFunction(arguments.length == 1 ? arguments[0] : arguments);
      this.setState({
        logs: this.state.logs.concat(arguments[0].toString())
      })
    }.bind(this);
  }

  render() {
    return(
      <div className={classNames(styles.outerLog)}>
        <div className={classNames(styles.innerLog)}>
          {this.state.logs.map(function(thisLog, idx) {
            return <div key={"log"+idx.toString()}>{thisLog}</div>
          })}
        </div>
      </div>
    )
  }
}

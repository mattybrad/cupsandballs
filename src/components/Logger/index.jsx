import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class Logger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      isFullHeight: true
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

  componentDidUpdate() {
    // need to check whether logger has reached full height
    // apparently the only reliable way to check is this hack
    // http://stackoverflow.com/questions/26556436/react-after-render-code
    setTimeout(function() {
      window.requestAnimationFrame(function() {
        if(this.refs.logger.clientHeight > window.innerHeight - 20) {
          if(!this.state.isFullHeight) this.setState({
            isFullHeight: true
          })
        } else {
          if(this.state.isFullHeight) this.setState({
            isFullHeight: false
          })
        }
      }.bind(this))
    }.bind(this), 0);
  }

  render() {
    var heightClass = this.state.isFullHeight?styles.fullHeight:styles.subFullHeight;
    return(
      <div ref="logger" className={classNames(styles.logger, heightClass)}>
        {this.state.logs.map(function(thisLog, idx) {
          return <div key={"log"+idx.toString()}>{thisLog}</div>
        })}
      </div>
    )
  }
}

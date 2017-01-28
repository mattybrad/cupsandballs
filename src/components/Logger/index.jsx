import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class Logger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logs: [
        "website loading...",
        "website loaded"
      ],
      isFullHeight: true,
      charactersToDisplay: 0
    }
  }

  componentDidMount() {
    var actualLogFunction = window.console.log;
    window.console.log = function() {
      actualLogFunction(arguments.length == 1 ? arguments[0] : arguments);
      this.setState({
        logs: this.state.logs.concat(arguments[0].toString()),
        charactersToDisplay: 0
      })
    }.bind(this);
    setInterval(this.incrementCharactersToDisplay.bind(this), 20);

    // remove preload div - timeout is a hack to stop flicker
    setTimeout(function(){
      document.body.removeChild(document.getElementById("preload"));
    },0);
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

  incrementCharactersToDisplay() {
    if(this.state.logs.length) {
      if(this.state.charactersToDisplay < this.state.logs[this.state.logs.length - 1].length) {
        this.setState({
          charactersToDisplay: this.state.charactersToDisplay + 1
        })
      }
    }
  }

  render() {
    var heightClass = this.state.isFullHeight?styles.fullHeight:styles.subFullHeight;
    var numLogs = this.state.logs.length;
    return(
      <div ref="logger" className={classNames(styles.logger, heightClass)}>
        {this.state.logs.map(function(thisLog, idx) {
          return <div key={"log"+idx.toString()}>{idx<numLogs-1?thisLog:thisLog.slice(0,this.state.charactersToDisplay)}</div>
        }.bind(this))}
      </div>
    )
  }
}

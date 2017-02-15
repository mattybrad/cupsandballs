import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class SoundToy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    // this is a bit verbose but also pretty cool
    switch(this.props.toy.toLowerCase()) {
      case "randomspiel":
      require.ensure([], () => {
        var ToyComponent = require('../Randomspiel');
        this.setState({
          ToyComponent: ToyComponent.default
        })
      })
      break;

      case "wavemaker":
      require.ensure([], () => {
        var ToyComponent = require('../WaveMaker');
        this.setState({
          ToyComponent: ToyComponent.default
        })
      })
      break;

      case "othertoy":
      require.ensure([], () => {
        var ToyComponent = require('../OtherToy');
        this.setState({
          ToyComponent: ToyComponent.default
        })
      })
      break;

      default:
      this.setState({
        error: "Unable to load sound toy."
      })
    }
  }

  render() {
    var c;
    if(this.state.error) {
      c = <p>{this.state.error}</p>
    } else if(this.state.ToyComponent) {
      c = <this.state.ToyComponent width={this.props.width} height={this.props.height} />
    } else {
      c = <p>Loading...</p>
    }
    return(
      <div
        className={classNames(styles.this)}
        style={{
          width: this.props.width+"px",
          height: this.props.height+"px"
        }}
      >
        {c}
      </div>
    )
  }
}

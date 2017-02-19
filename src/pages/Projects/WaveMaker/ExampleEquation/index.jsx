import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import { connect } from 'react-redux';
import * as Actions from '../../../../actions/SoundToyActions';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSoundToy: (toy, vars) => {
      dispatch(Actions.updateSoundToy(toy, vars));
    }
  }
}

class ExampleEquationComponent extends React.Component {

  onClick() {
    this.props.updateSoundToy(
      "wavemaker",
      {
        exampleEquation: this.props.equation
      }
    )
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <h1 onClick={this.onClick.bind(this)}>{this.props.equation}</h1>
        <p>{this.props.children}</p>
      </div>
    )
  }
}

const ExampleEquation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleEquationComponent);

export default ExampleEquation;

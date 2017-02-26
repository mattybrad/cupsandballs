import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';
import MusicDefinition from '../../components/MusicDefinition';
import musicDef from './musicDef';
import * as Actions from '../../actions/BackgroundActions';
import { connect } from 'react-redux';
import styles from './index.css';

const mapStateToProps = (state) => {
  return {
    musicActive: state.Background.musicActive,
    backgroundActive: state.Background.backgroundActive,
    consoleActive: state.Background.consoleActive,
    domActive: state.Background.domActive,
    anyActive: state.Background.musicActive||state.Background.backgroundActive||state.Background.consoleActive||state.Background.domActive
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMusicActive: (isActive) => {
      dispatch(Actions.setMusicActive(isActive));
    },
    setBackgroundActive: (isActive) => {
      dispatch(Actions.setBackgroundActive(isActive));
    },
    setConsoleActive: (isActive) => {
      dispatch(Actions.setConsoleActive(isActive));
    },
    setDomActive: (isActive) => {
      dispatch(Actions.setDomActive(isActive));
    }
  }
}

class AmbienceComponent extends React.Component {

  toggleAllFeatures() {
    this.props.setMusicActive(!this.props.anyActive);
    this.props.setBackgroundActive(!this.props.anyActive);
    this.props.setConsoleActive(!this.props.anyActive);
    this.props.setDomActive(!this.props.anyActive);
  }

  toggleMusic() {
    this.props.setMusicActive(!this.props.musicActive);
  }

  toggleBackground() {
    this.props.setBackgroundActive(!this.props.backgroundActive);
  }

  toggleConsole() {
    this.props.setConsoleActive(!this.props.consoleActive);
  }

  toggleDom() {
    this.props.setDomActive(!this.props.domActive);
  }

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#aadd00' secondaryColor='#aa0000' />
        <MusicDefinition musicDef={musicDef} />
        <h1>Ambience</h1>
        <p>I wanted this website to be fun, nerdy and interactive, rather than slick and minimalistic. To this end, there are a few optional features (animated background, algorithmic muzak, etc) that you won't find on most sites. If you would like to disable any of these features for a more relaxing browsing experience, you can do so below.</p>
        <span className={classNames(styles.controls)}>
          <p onClick={this.toggleAllFeatures.bind(this)}>Click here to {this.props.anyActive?"disable":"enable"} all extra features</p>
          <p onClick={this.toggleMusic.bind(this)}>Click here to {this.props.musicActive?"disable":"enable"} the background music</p>
          <p onClick={this.toggleBackground.bind(this)}>Click here to {this.props.backgroundActive?"disable":"enable"} the animated background</p>
          <p onClick={this.toggleConsole.bind(this)}>Click here to {this.props.consoleActive?"disable":"enable"} the console log</p>
          <p onClick={this.toggleDom.bind(this)}>Click here to {this.props.domActive?"disable":"enable"} the DOM preview</p>
        </span>
      </div>
    )
  }
}

const Ambience = connect(
  mapStateToProps,
  mapDispatchToProps
)(AmbienceComponent);

export default Ambience;

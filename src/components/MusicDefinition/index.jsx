import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/BackgroundActions';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMusicDef: (musicDef) => {
      dispatch(Actions.setMusicDef(musicDef));
    }
  }
}

class MusicDefinitionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		this.props.setMusicDef(this.props.musicDef);
	}

	render() {
		return (
		    null
		)
	}
}

const MusicDefinition = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicDefinitionComponent);

export default MusicDefinition;

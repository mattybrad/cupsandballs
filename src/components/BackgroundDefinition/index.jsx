import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/BackgroundActions';

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setColors: (primaryColor, secondaryColor, image) => {
      dispatch(Actions.setColors(primaryColor, secondaryColor, image));
    }
  }
}

class BackgroundDefinitionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		this.props.setColors(this.props.primaryColor, this.props.secondaryColor, this.props.image);
	}

	render() {
		return (
		    null
		)
	}
}

const BackgroundDefinition = connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundDefinitionComponent);

export default BackgroundDefinition;

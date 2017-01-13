import React from 'react';
import classNames from 'classnames';
import MainApp from '../MainApp';
import CupsAndBalls from '../CupsAndBalls';

export default class MainAppOuter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainAppComponent: null,
      mainAppUpdateCount: 0
    }
  }

  componentWillMount() {
    this.setState({
      mainAppComponent: <MainApp onRender={this.onMainAppRender.bind(this)} />
    })
  }

  onMainAppRender() {
    // currently triggering code re-render with this, which is... not the best
    this.setState({
      mainAppUpdateCount: this.state.mainAppUpdateCount + 1
    })
  }

  render() {
    return(
      <div>
        {this.props.children}
        <CupsAndBalls mainAppComponent={this.state.mainAppComponent} />
      </div>
    )
  }
}

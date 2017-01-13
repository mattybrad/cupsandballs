import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './components/MainApp';
import CupsAndBalls from './components/CupsAndBalls';
import classNames from 'classnames';
import styles from './index.css';

class App extends React.Component {
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
      <div className={classNames(styles.this)}>
        {this.state.mainAppComponent}
        <CupsAndBalls mainAppComponent={this.state.mainAppComponent} />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

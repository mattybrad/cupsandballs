import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'
import MainApp from './components/MainApp';
import CupsAndBalls from './components/CupsAndBalls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainAppHTML: "testing",
      mainAppComponent: null
    }
  }

  componentWillMount() {
    this.setState({
      mainAppComponent: <MainApp onRender={this.onMainAppRender.bind(this)} />
    })
  }

  onMainAppRender() {
    if(this.state.mainAppComponent) {
      this.setState({
        mainAppHTML: ReactDOMServer.renderToStaticMarkup(this.state.mainAppComponent)
      })
    }
  }

  render() {
    return(
      <div>
        {this.state.mainAppComponent}
        <CupsAndBalls mainAppHTML={this.state.mainAppHTML} />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

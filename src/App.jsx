import React from 'react';
import ReactDOM from 'react-dom';
//import CodeBackground from './components/CodeBackground';
import MainApp from './components/MainApp';
import CupsAndBalls from './components/CupsAndBalls';

class App extends React.Component {
  render() {
    return(
      <div>
        <MainApp/>
        <CupsAndBalls/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

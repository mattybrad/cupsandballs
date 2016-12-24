import React from 'react';
import ReactDOM from 'react-dom';
import CodeBackground from './components/CodeBackground';

class App extends React.Component {
  render() {
    return(
      <div><CodeBackground/></div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

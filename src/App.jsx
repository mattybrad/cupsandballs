import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import classNames from 'classnames';
import styles from './index.css';
import * as Pages from './pages';
import { Router, Route, Link, browserHistory } from 'react-router';

class App extends React.Component {

  render() {
    return(
      <Router history={browserHistory}>
        <Route path="" component={Main}>
          <Route path="/" component={Pages.Home} />
          <Route path="away" component={Pages.Away} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

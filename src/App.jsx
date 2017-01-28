import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import classNames from 'classnames';
import styles from './index.css';
import * as Pages from './pages';
import { Router, Route, Link, browserHistory } from 'react-router';

class App extends React.Component {

  componentDidMount() {
    // add some pointless but fun console logging for a future-retro kinda vibe
    window.addEventListener('resize', function() {
      console.log("window resize detected");
    });
    window.addEventListener('focus', function() {
      console.log("window gained focus");
    });
    window.addEventListener('blur', function() {
      console.log("window lost focus");
    });
    setInterval(function() {
      console.log("random console message");
    }, 10000);
    console.log("website initialised");
  }

  render() {
    return(
      <Router history={browserHistory}>
        <Route path="" component={Main}>
          <Route path="/" component={Pages.Home} />
          <Route path="about" component={Pages.About} />
          <Route path="projects" component={Pages.Projects} />
          <Route path="blog" component={Pages.Blog} />
          <Route path="ambience" component={Pages.Ambience} />
          <Route path="*" component={Pages.FourZeroFour} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

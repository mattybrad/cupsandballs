import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import Main from './components/Main';
import classNames from 'classnames';
import styles from './index.css';
import * as Pages from './pages';
import * as Projects from './pages/projects/allProjects.jsx';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

window.store = createStore(
  rootReducer,
  applyMiddleware(
  	thunkMiddleware
  )
);

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
    window.addEventListener('click', function() {
      console.log("mouse button clicked");
    });
  }

  render() {
    return(
      <Provider store={window.store}>
        <Router history={browserHistory}>
          <Route path="/" component={Main}>
            <IndexRoute component={Pages.Home} />
            <Route path="about" component={Pages.About} />
            <Route path="projects">
              <IndexRoute component={Pages.Projects} />
              <Route path={Projects.TestProject.shortcode} component={Projects.TestProject} />
              <Route path={Projects.TestProject2.shortcode} component={Projects.TestProject2} />
            </Route>
            <Route path="ambience" component={Pages.Ambience} />
            <Route path="*" component={Pages.FourZeroFour} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

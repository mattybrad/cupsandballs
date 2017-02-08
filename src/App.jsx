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

const store = createStore(
  rootReducer,
  applyMiddleware(
  	thunkMiddleware
  )
);

class App extends React.Component {

  constructor(props) {
    super(props);
    window.actx = new (AudioContext||webkitAudioContext)();
  }

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

  }

  render() {
    return(
      <Provider store={store}>
        <Router history={browserHistory}>
          {/*
            the syntax on the next line looks a bit weird, and here's why:
            the Main component needs to be passed the store
            to do this, i googled and came up with this:
            https://www.reddit.com/r/reactjs/comments/45r58a/reactrouter_passing_props_the_2016_way/
            it's nicer than the global variable i was using before!
          */}
          <Route path="/" component={(props, state, params) => <Main store={store} {...props} />}>
            <IndexRoute component={Pages.Home} />
            <Route path="about" component={Pages.About} />
            <Route path="projects">
              <IndexRoute component={Pages.Projects} />
              <Route path={Projects.RobotSwans.shortcode} component={Projects.RobotSwans} />
              <Route path={Projects.Randomspiel.shortcode} component={Projects.Randomspiel} />
              <Route path={Projects.WalkmanSynth.shortcode} component={Projects.WalkmanSynth} />
              <Route path={Projects.ProjectPluto.shortcode} component={Projects.ProjectPluto} />
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

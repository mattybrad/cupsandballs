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
import { Router, Route, Link, browserHistory } from 'react-router';

const store = createStore(
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
      <Provider store={store}>
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
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

import React from 'react';
import pretty from 'pretty';
import ReactDOMServer from 'react-dom/server';
import classNames from 'classnames';
import styles from './index.css';

export default class CupsAndBalls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prettyHTML: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      prettyHTML: pretty(ReactDOMServer.renderToStaticMarkup(nextProps.mainAppComponent))
    })
  }

  render() {
    console.log(styles);
    return(
      <pre className={classNames(styles.this)}>{this.state.prettyHTML}</pre>
    )
  }
}

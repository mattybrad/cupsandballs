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

  componentDidMount() {
    this.makePrettyHTML(this.props.mainAppComponent);
  }

  componentWillReceiveProps(nextProps) {
    this.makePrettyHTML(nextProps.mainAppComponent);
  }

  makePrettyHTML(mainAppComponent) {
    this.setState({
      prettyHTML: pretty(ReactDOMServer.renderToStaticMarkup(mainAppComponent))
    })
  }

  render() {
    return(
      <pre className={classNames(styles.this)}>{this.state.prettyHTML}</pre>
    )
  }
}

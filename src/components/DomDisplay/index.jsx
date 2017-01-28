import React from 'react';
import pretty from 'pretty';
import ReactDOMServer from 'react-dom/server';
import classNames from 'classnames';
import styles from './index.css';
import { Provider } from 'react-redux';

export default class DomDisplay extends React.Component {
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
    // store is required here, otherwise react gets in a tizzy
    var componentWithStore = <Provider store={this.props.store}>{mainAppComponent}</Provider>
    this.setState({
      prettyHTML: pretty(ReactDOMServer.renderToStaticMarkup(componentWithStore))
    })
  }

  render() {
    return(
      <pre className={classNames(styles.this)}>{this.state.prettyHTML}</pre>
    )
  }
}

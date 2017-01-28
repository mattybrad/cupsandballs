import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import styles from './index.css';

export default class ProjectPreview extends React.Component {

  render() {
    return(
      <Link to={"projects/"+this.props.project.shortcode} className={classNames(styles.this)}>
        <h1>{this.props.project.title}</h1>
        <p>{this.props.project.description}</p>
      </Link>
    )
  }
}

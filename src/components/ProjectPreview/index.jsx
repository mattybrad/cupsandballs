import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import styles from './index.css';

export default class ProjectPreview extends React.Component {

  render() {
    return(
      <Link to={"projects/"+this.props.project.shortcode} className={classNames(styles.this)}>
        <div>
          <h3>{this.props.project.title}</h3>
          <p>{this.props.project.description}</p>
        </div>
      </Link>
    )
  }
}

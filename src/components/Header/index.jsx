import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import styles from './index.css';

export default class Header extends React.Component {

  render() {
    return(
      <div className={classNames(styles.this)}>
        <Link to="/">Home</Link><span>, </span>
        <Link to="/about">About</Link><span>, </span>
        <Link to="/projects">Projects</Link><span>, </span>
        <Link to="/ambience">Ambience.</Link>
      </div>
    )
  }
}

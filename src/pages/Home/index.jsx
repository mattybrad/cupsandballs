import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

export default class Home extends React.Component {
  render() {
    return(
      <div>the home page!<Link to="away">LINK</Link></div>
    )
  }
}

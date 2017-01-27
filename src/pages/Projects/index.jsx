import React from 'react';
import classNames from 'classnames';
import Header from '../../components/Header';
import * as ProjectList from './allProjects.jsx';

export default class About extends React.Component {

  render() {
    return(
      <div>
        <Header />
        <h1>Projects</h1>
        <p>A list of projects!</p>
        <div>
          <p>{ProjectList.TestProject.title} - {ProjectList.TestProject.description}</p>
          <p>{ProjectList.TestProject2.title} - {ProjectList.TestProject2.description}</p>
        </div>
      </div>
    )
  }
}

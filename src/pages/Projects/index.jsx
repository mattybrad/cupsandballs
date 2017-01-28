import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';
import ProjectPreview from '../../components/ProjectPreview';
import * as ProjectList from './allProjects.jsx';

export default class Projects extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#000066' secondaryColor='#0066ff' />
        <h1>Projects</h1>
        <p>A list of projects!</p>
        <div>
          <ProjectPreview project={ProjectList.RobotSwans} />
          <ProjectPreview project={ProjectList.Randomspiel} />
        </div>
      </div>
    )
  }
}

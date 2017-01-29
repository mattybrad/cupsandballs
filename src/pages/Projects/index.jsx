import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';
import ProjectPreview from '../../components/ProjectPreview';
import * as ProjectList from './allProjects.jsx';

export default class Projects extends React.Component {

  constructor(props) {
    super(props);
    var projectList = [
      ProjectList.RobotSwans,
      ProjectList.Randomspiel,
      ProjectList.WalkmanSynth,
      ProjectList.ProjectPluto
    ];
    var randomProjectList = [];
    while(projectList.length) {
      randomProjectList.push(projectList.splice(Math.floor(Math.random()*projectList.length),1)[0]);
    }
    this.state = {
      projectList: randomProjectList
    }
  }

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#000066' secondaryColor='#0066ff' />
        <h1>Projects</h1>
        <p>Below is a list of projects I have worked on, representing a cross-section of music, electronics, programming, and occasionally other (in)disciplines. They are in no particular order. In fact, the order is randomly generated each time you view the page.</p>
        <div>
          {this.state.projectList.map(function(project, idx) {
            return <ProjectPreview key={"project"+idx} project={project} />
          })}
        </div>
      </div>
    )
  }
}

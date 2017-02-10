import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
import AudioPlayer from '../../../components/AudioPlayer';

export default class Project extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#00FF99' secondaryColor='#006699' />
        <h1>Robot Swans</h1>
        <p>Robot Swans is a band I started with two friends in 2013. We play twinkly indie pop-rock. You can <a href="http://robotswans.bandcamp.com/" target="_blank">buy our album on Bandcamp</a>.</p>
        <p>This is a song of ours called {"Islands"}:</p>
        <AudioPlayer title="Robot Swans - Islands" src="/assets/audio/robotswans/robot_swans_islands.mp3" />
        <p>And here is another song called {"Something In The Water"}</p>
        <AudioPlayer title="Robot Swans - Something In The Water" src="/assets/audio/robotswans/robot_swans_something_in_the_water.mp3" />
      </div>
    )
  }
}

Project.shortcode = "robotswans";
Project.title = "Robot Swans";
Project.description = "My indie pop band, as heard on BBC (...Oxford)";

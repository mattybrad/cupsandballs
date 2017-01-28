import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';

export default class Project extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#006600' secondaryColor='#999900' />
        <h1>Robot Swans</h1>
        <p>Robot Swans is a band I started with two friends in 2013. We play twinkly indie pop-rock. You can <a href="http://robotswans.bandcamp.com/" target="_blank">buy our album on Bandcamp</a>.</p>
        <p>One of our early songs, written by Laura Theis, was called Pricks Of The Trade. This video does a pretty good job of illustrating our recording process.</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/L8iwSJZW954" frameborder="0" allowfullscreen></iframe>
        <p>We've also played live quite a bit around Oxford, including a gig for Sofar Sounds.</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/WbQbwPG_TAk" frameborder="0" allowfullscreen></iframe>
      </div>
    )
  }
}

Project.shortcode = "robotswans";
Project.title = "Robot Swans";
Project.description = "My indie pop band, as heard on BBC (...Oxford)";

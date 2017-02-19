import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../components/BackgroundDefinition';
import MusicDefinition from '../../components/MusicDefinition';
import musicDef from './musicDef';
import SelfPortrait from './SelfPortrait';
import styles from './index.css';

export default class About extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#33BB00' secondaryColor='#003333' />
        <MusicDefinition musicDef={musicDef} />
        <h1>About</h1>
        <p>{"I am a programmer, musician and maker from Oxford, England. I made this website to showcase some of the creative projects I have worked on."}</p>
        <div className={classNames(styles.selfPortrait)}>
          <SelfPortrait />
        </div>
        <p>{"This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works."}</p>
        <p>{"This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works."}</p>
        <p>{"This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works."}</p>
        <p>{"This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works."}</p>
        <p>{"This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works. This is some more text, to see whether the float CSS works."}</p>
      </div>
    )
  }
}

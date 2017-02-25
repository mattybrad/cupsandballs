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
        <p>{"I first started programming computers when I was at primary school. There was an RM Nimbus in the corner of the classroom, and we were encouraged to use the Logo program to draw patterns. We would send a miniature turtle around the screen using simple commands which trailed chunky 8-bit colours, yielding spirograph-like patterns."}</p>
        <p>{"It occurred to me that it would be possible to create a basic driving simulator by tracing out a geometric representation of a road, its painted lines, and a horizon, clearing and redrawing the screen several times a second to create the illusion of movement."}</p>
        <p>{"The first time I got to see a proper programming language in action was not long after. I was on holiday with a friend who was a couple of years older, and knew how to write programs in QBasic. I was obsessed with football at the time, so he showed me how to write an FA Cup simulator. It would take a list of teams and run through the tournament, giving a random score for each game and putting the winner through to the next round."}</p>
        <p>{"A year or two later, I had a computer of my own and was starting to experiment with making music. My earliest recordings were put together with a demo copy of Noteworthy Composer and a the limited tinny palette of a basic 90's soundcard. Through library books and a copy of the Tandy catalogue (this was before I had access to the web), I gradually inferred that the computer's joystick port could be used to commune digitally with an appropriate piano keyboard. Thus, my arsenal of sounds expanded, first to a plastic-sounding home keyboard and then to a Yamaha XG sound module, an unassuming grey box which, aged 14, I thought was the coolest thing in the world."}</p>
        <p>{"I made a demo tape and sent it to Future Music magazine under the moniker \"Contrast\", convinced it would be featured on their monthly CD. It was not. The five-word review, which impressively managed to convey criticism, a hint of promise, and even a half-rhyme, read: \"Dated sounds let it down.\""}</p>
      </div>
    )
  }
}

import React from 'react';
import classNames from 'classnames';
import BackgroundDefinition from '../../../components/BackgroundDefinition';
import AudioPlayer from '../../../components/AudioPlayer';

export default class Project extends React.Component {

  render() {
    return(
      <div>
        <BackgroundDefinition primaryColor='#CCCC66' secondaryColor='#996600' />
        <h1>Fake Modular Synth</h1>
        <p>{"A modular synthesizer is one in which you have absolute control over the sound. Each part of the signal chain is optional, and can be connected in any order you desire. Such synthesizers are curiously beautiful, with their rainbow spaghetti of patch cables evoking a laboratory as much as a studio. They are also expensive, so I thought I would have a go at building my own, with a twist:"}</p>
        <p>{"At first glance, my creation looks and functions like a real modular synth. It is an MDF box of utilitarian aesthetic, covered in sockets, knobs and pencil markings. Each section can be plugged into other sections by means of standard 3.5mm mono patch cables. Doing so will create exciting sounds. However, instead of complex circuitry generating the waveforms and envelopes required, all of the sound generation is done in software on a laptop."}</p>
        <p>{"The only task that the box itself is responsible for is relaying information to the software. An Arduino-based circuit keeps track of which connections have been made between sockets, and what the value of each knob is. In essence, the project is just a basic soft synth with a weird and specific MIDI controller."}</p>
        <p>{"This setup does not give you the genuine, warm analogue sound of expensive modular synthesizers. What it does provide, though, is the ability to think of a new module, sketch it on the front panel, drill a couple of holes, connect a couple of wires, write some code and then start using that module. You can think of it as a rapid prototyping tool for designing your own synth modules. Or it's just a cheap, fake, modular synthesizer. Either way, it's been a really fun project thus far."}</p>
        <p>If you want to build your own, <a href="https://github.com/mattybrad/modularsynth">the code and circuit diagrams are on GitHub.</a></p>
      </div>
    )
  }
}

Project.shortcode = "fakemodularsynth";
Project.title = "Fake Modular Synth";
Project.description = "A digital modular synthesizer, using a combination of Arduino and Javascript"

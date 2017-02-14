export default {
  tempo: 70,
  channels: [
    {
      volume: 0.7,
      type: "osc",
      waveform: "sawtooth",
      attack: 0,
      decay: 0.15,
      sustain: 0.01,
      release: 0.1,
      steps: 4,
      notes: [
        ["A1",0,1],
        ["A1",1,1],
        ["A1",2,1],
        ["A1",3,1]
      ]
    },
    {
      volume: 0.3,
      type: "osc",
      waveform: "sine",
      attack: 0,
      decay: 0.15,
      sustain: 0.5,
      release: 0.5,
      arpeggiator: {
        octaves: 1,
        notes:["A3","B3","C#3","D#3","F3","G3"],
        pattern: "random"
      }
    },
    {
      volume: 0.3,
      type: "osc",
      waveform: "sine",
      attack: 0,
      decay: 0.15,
      sustain: 0.5,
      release: 0.5,
      arpeggiator: {
        octaves: 1,
        notes:["A3","B3","C#3","D#3","F3","G3"],
        pattern: "random"
      }
    }
  ]
}

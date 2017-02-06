export default {
  tempo: 40,
  channels: [
    {
      type: "osc",
      waveform: "square",
      attack: 0,
      decay: 0.05,
      sustain: 0.4,
      release: 0.5,
      steps: 7,
      notes: [
        ["C3",0,1],
        ["B3",1,1],
        ["A3",2,1],
        ["G3",3,1],
        ["F3",4,1],
        ["E3",5,1],
        ["D3",6,1]
      ]
    },
    {
      type: "osc",
      waveform: "square",
      attack: 0.5,
      decay: 0.2,
      sustain: 0.7,
      release: 1,
      steps: 16,
      notes: [
        ["E1",0,4],
        ["F1",4,4],
        ["G1",8,8]
      ]
    }
  ]
}

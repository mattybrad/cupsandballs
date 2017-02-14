export default {
  tempo: 60,
  channels: [
    {
      volume: 0.6,
      type: "osc",
      waveform: "triangle",
      attack: 1,
      decay: 0.1,
      sustain: 0.8,
      release: 2,
      steps: 64,
      notes: [
        ["C3",0,16],
        ["E3",0,16],
        ["G2",0,16],
        ["D3",16,16],
        ["B3",16,16],
        ["G2",16,16],
        ["A3",32,16],
        ["E3",32,16],
        ["C3",32,16],
        ["B3",48,16],
        ["G2",48,16],
        ["E3",48,16]
      ]
    }
  ]
}

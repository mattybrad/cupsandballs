export default {
  tempo: 70,
  channels: [
    {
      volume: 0.5,
      type: "osc",
      arpeggiator: {
        octaves: 4,
        notes:["C2","Eb2","G2"],
        pattern: "random"
      }
    },
    {
      volume: 0.5,
      type: "osc",
      arpeggiator: {
        octaves: 4,
        notes:["C2","Eb2","G2"],
        pattern: "random"
      }
    },
    {
      volume: 0.5,
      type: "osc",
      arpeggiator: {
        octaves: 4,
        notes:["F2","G2","B2"],
        pattern: "random"
      }
    }
  ]
}

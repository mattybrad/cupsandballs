import React from 'react';

export default class OtherToy extends React.Component {

  componentDidMount() {
    require.ensure([], () => {
      var PhaserLoader = require('../PhaserLoader');
    });
  }

  render() {
    return(
      <div>This is a less good toy but it proves a point</div>
    )
  }
}

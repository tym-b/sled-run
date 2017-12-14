import React, { PureComponent } from 'react';

import Engine from './engine';
import SensorData from './sensorData';

export default class Game extends PureComponent {
  componentDidMount() {
    this.engine = new Engine(this.renderTarget, new SensorData());
    window.addEventListener('resize', this.engine.updateViewport);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.engine.updateViewport);
  }

  handleContainerRef = (ref) => (this.renderTarget = ref);

  render() {
    return (
      <div>
        <div ref={this.handleContainerRef} />
      </div>
    );
  }
}

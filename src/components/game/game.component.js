import React, { PureComponent } from 'react';

import Engine from './engine';


export default class Game extends PureComponent {
  componentDidMount() {
    this.engine = new Engine(this.renderTarget);

    window.addEventListener('resize', this.engine.updateViewport);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.engine.updateViewport);
  }

  handleContainerRef = (ref) => (this.renderTarget = ref);

  render = () => <div ref={this.handleContainerRef} />;
}

import Physics from './physics';
import Engine3D from './3d';

export const TRACK_SEGMENT_STRAIGHT = 0;


export default class Engine {
  constructor(renderTarget) {
    const track = Array(3).fill(TRACK_SEGMENT_STRAIGHT);

    this.physics = new Physics(track);
    this.engine3d = new Engine3D(renderTarget, this.physics, track);
    this.engine3d.load().then(this.init);
  }

  updateViewport = () => {
    this.engine3d.updateViewport();
  };

  loop = (time) => {
    requestAnimationFrame(this.loop);
    this.physics.update(time);
    this.engine3d.render(time);
  };

  init = () => {
    requestAnimationFrame(this.loop);
  };
}

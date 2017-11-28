import Physics from './physics';
import Engine3D from './3d';
import generateRocks from './trackGenerator';


export default class Engine {
  constructor(renderTarget) {
    const track = generateRocks();

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
  }

  init = () => {
    requestAnimationFrame(this.loop);
  };
}

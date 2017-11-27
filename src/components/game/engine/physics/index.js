import createGround from './objects/ground';
import createPlayer from './objects/player';
import createWorld from './objects/world';


export default class Physics {
  constructor() {
    this.world = createWorld();

    this.player = createPlayer();
    this.world.addBody(this.player);

    this.ground = createGround();
    this.world.addBody(this.ground);
  }

  update() {
    this.world.step(1 / 60);
  }
}

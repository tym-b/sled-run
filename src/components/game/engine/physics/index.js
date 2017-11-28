import createGround from './objects/ground';
import createPlayer from './objects/player';
import createWorld from './objects/world';
import createRock from './objects/rock';


export default class Physics {
  constructor(track) {
    this.world = createWorld();

    this.player = createPlayer();
    this.world.addBody(this.player);

    this.ground = createGround();
    this.world.addBody(this.ground);

    track.forEach((point) => {
      this.world.addBody(createRock(point));
    });
  }

  update() {
    this.world.step(1 / 60);
  }
}

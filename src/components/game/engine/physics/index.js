import * as CANNON from 'cannon';
import { clamp } from 'lodash';

import createGround from './objects/ground';
import createPlayer from './objects/player';
import createWorld from './objects/world';
import createTrack from './objects/track';


export default class Physics {
  constructor() {
    this.world = createWorld();

    this.player = createPlayer();
    this.world.addBody(this.player);

    this.ground = createGround();
    this.world.addBody(this.ground);

    for (let i = 0; i < 100; i += 1) {
      createTrack(i * 200).forEach((object) => {
        this.world.addBody(object);
      });
    }

    this.rotation = 0;
    this.realRotation = 0;

    window.addEventListener('keydown', ({ key }) => {
      if (key === 'ArrowLeft') {
        this.rotation = -1;
      } else if (key === 'ArrowRight') {
        this.rotation = 1;
      }
    });

    window.addEventListener('keyup', () => {
      this.rotation = 0;
    });
  }

  update() {
    this.realRotation = clamp(this.realRotation + this.rotation * 0.05, -1, 1);
    this.player.quaternion.setFromAxisAngle(new CANNON.Vec3(0, -0.5, -0.5), 0.2 * Math.PI * this.realRotation);
    this.player.applyLocalForce(new CANNON.Vec3(this.realRotation * 600, 0, -800), new CANNON.Vec3(0, 0, 0));
    this.world.step(1 / 60);
  }
}

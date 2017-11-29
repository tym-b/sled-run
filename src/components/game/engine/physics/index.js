import * as CANNON from 'cannon';
import { clamp } from 'lodash';

import createGround, { material as groundMaterial } from './objects/ground';
import createPlayer, { material as playerMaterial } from './objects/player';
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

    // const rampMaterial = new CANNON.Material('rampMaterial');
    const ramp = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, -10, -50),
      shape: new CANNON.Box(new CANNON.Vec3(10, 10, 10)),
      material: groundMaterial,
    });

    ramp.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), -0.2 * Math.PI);

    this.world.addBody(ramp);

    this.rotation = 0;
    this.realRotation = 0;

    window.addEventListener('keydown', ({ key }) => {
      if (key === 'ArrowLeft') {
        this.rotation = -1;
      } else if (key === 'ArrowRight') {
        this.rotation = 1;
      }
    });

    window.addEventListener('keyup', ({ key }) => {
      this.rotation = 0;
    });
  }

  // this.player.applyLocalImpulse(new CANNON.Vec3(5, 0, 0), new CANNON.Vec3(0, 0, 0));
  // this.player.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -0.2 * Math.PI);

  update() {
    this.realRotation = clamp(this.realRotation + this.rotation * 0.05, -1, 1);
    this.player.quaternion.setFromAxisAngle(new CANNON.Vec3(0, -0.5, -0.5), 0.2 * Math.PI * this.realRotation);
    this.player.applyLocalForce(new CANNON.Vec3(this.realRotation * 600, 0, -800), new CANNON.Vec3(0, 0, 0));
    this.world.step(1 / 60);
  }
}

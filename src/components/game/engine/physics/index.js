import * as CANNON from 'cannon';
import { identity } from 'ramda';

import createGround from './objects/ground';
import createPlayer from './objects/player';
import createWorld from './objects/world';
import createTrack, { createTrackBoosters } from './objects/track';
import { COIN_MATERIAL } from './objects/track/objects/coin/';

let timeoutId = null;

export default class Physics {
  constructor(trackData) {
    this.world = createWorld();

    this.player = createPlayer();
    this.world.addBody(this.player);

    this.ground = createGround();
    this.world.addBody(this.ground);
    this.objects = [];
    this.objectsToRemove = [];

    createTrack(trackData).forEach((object) => {
      this.world.addBody(object);
    });

    createTrackBoosters(trackData).forEach((object, index) => {
      this.world.addBody(object);
      this.objects.push(object);

      switch (object.material.name) {
        case COIN_MATERIAL:
          object.addEventListener('collide', (e) => this.handleCollide(e, index));
          break;
        default:
          return null;
      }
    });

    this.rotation = 0;
    this.realRotation = 0;

    window.addEventListener('keydown', ({ key }) => {
      if (key === 'ArrowLeft') {
        this.rotation = 1;
      } else if (key === 'ArrowRight') {
        this.rotation = -1;
      }
    });

    window.addEventListener('keyup', () => {
      this.rotation = 0;
    });
  }

  onCollideHandler = identity;

  set onCollide(fn) {
    this.onCollideHandler = fn;
  }

  resetSpeedBooster = () =>
    setTimeout(() => {
      this.player.userData.speed = 150;
      timeoutId = null;
    }, 2000);

  clearWorld = () => {
    this.objectsToRemove.forEach((objectToRemove) => {
      this.world.remove(this.objects[objectToRemove]);
    });
    this.objectsToRemove = [];
  };

  handleCollide = (e, index) => {
    this.objects[index].removeEventListener('collide', (ev) => this.handleCollide(ev, index));
    this.objectsToRemove.push(index);
    this.player.userData.speed = this.player.userData.speedBooster;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = this.resetSpeedBooster();
    } else {
      timeoutId = this.resetSpeedBooster();
    }

    this.onCollideHandler(e, index);
  };

  update() {
    this.realRotation = this.realRotation + this.rotation * 0.015;
    this.player.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), this.realRotation);
    this.player.applyLocalForce(new CANNON.Vec3(0, 0, -this.player.userData.speed), new CANNON.Vec3(0, 0, 0));
    this.world.step(1 / 60);
    this.clearWorld();
  }
}

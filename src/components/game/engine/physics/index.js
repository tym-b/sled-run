import * as CANNON from 'cannon';
import { identity } from 'ramda';

import createGround from './objects/ground';
import createPlayer from './objects/player';
import createWorld from './objects/world';
import createTrack from './objects/track';

import { COIN_MATERIAL } from './objects/track/objects/coin/';
import { SNOWDRIFT_MATERIAL } from './objects/track/objects/snowdrift';

const COLLIDATE_MATERIALS = [COIN_MATERIAL, SNOWDRIFT_MATERIAL];

export default class Physics {
  constructor(trackData) {
    this.trackData = trackData;
    this.world = createWorld();

    this.player = createPlayer();
    this.world.addBody(this.player);

    this.ground = createGround();
    this.world.addBody(this.ground);
    this.objects = [];
    this.objectsToRemove = [];

    createTrack(trackData).forEach((object) => {
      this.world.addBody(object);

      if (COLLIDATE_MATERIALS.indexOf(object.material.name) > -1) {
        object.addEventListener('collide', () =>
          this.player.userData.collideHandler(object, this.onCoinCollideHandler));
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

  onCoinCollideHandler = identity;

  onSnowdriftCollideHandler = identity;

  set onCoinCollide(fn) {
    this.onCoinCollideHandler = fn;
  }

  set onSnowdriftCollide(fn) {
    this.onSnowdriftCollideHandler = fn;
  }

  clearWorld = () => {
    this.player.userData.objectsToRemove.forEach((objectToRemove) => {
      this.world.remove(objectToRemove);
    });
    this.player.userData.objectsToRemove = [];
  };

  update() {
    this.realRotation = this.realRotation + this.rotation * 0.015;
    this.player.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), this.realRotation);
    this.player.applyLocalForce(new CANNON.Vec3(0, 0, -this.player.userData.speed), new CANNON.Vec3(0, 0, 0));
    this.world.step(1 / 60);
    this.clearWorld();
  }
}

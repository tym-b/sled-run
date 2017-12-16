import * as CANNON from 'cannon';
import { identity } from 'ramda';

import createGround from './objects/ground';
import createPlayer from './objects/player';
import createWorld from './objects/world';
import createTrack from './objects/track';


export default class Physics {
  constructor(trackData, sensorData) {
    this.sensorData = sensorData;
    this.trackData = trackData;
    this.world = createWorld();

    this.player = createPlayer();
    this.world.addBody(this.player);

    this.ground = createGround();
    this.world.addBody(this.ground);

    this.dynamicObjects = [];

    createTrack(trackData).forEach((object) => {
      this.world.addBody(object);

      if (object.type === CANNON.Body.DYNAMIC) {
        this.dynamicObjects.push(object);
      }
    });

    this.rotation = 0;
  }

  onSnowdriftCollideHandler = identity;

  set onSnowdriftCollide(fn) {
    this.onSnowdriftCollideHandler = fn;
  }

  clearWorld = () => {
    this.player.userData.coinsToRemove.forEach(body => this.world.remove(body));
    this.player.userData.coinsToRemove = [];

    this.player.userData.snowdriftsToExplode.forEach(body => this.onSnowdriftCollideHandler(body));
    this.player.userData.snowdriftsToExplode = [];
  };

  update() {
    this.rotation = this.rotation + this.sensorData.getValue() * 0.003;
    this.player.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), this.rotation);
    this.player.applyLocalForce(new CANNON.Vec3(0, 0, -this.player.userData.speed), new CANNON.Vec3(0, 0, 0));
    this.world.step(1 / 60);
    this.clearWorld();
  }
}

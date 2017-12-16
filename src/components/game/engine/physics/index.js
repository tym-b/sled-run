import * as CANNON from 'cannon';
import { identity } from 'ramda';
import { flatten, uniq } from 'lodash';

import createGround from './objects/ground';
import createPlayer from './objects/player';
import createWorld from './objects/world';
import createTrack from './objects/track';

import { GREEN_PLAYER, RED_PLAYER } from '../../../../../server/helpers';


export default class Physics {
  constructor(trackData, sensorData) {
    this.sensorData = sensorData;
    this.trackData = trackData;
    this.world = createWorld();

    this.players = [
      createPlayer({ type: GREEN_PLAYER, position: { x: -10 } }),
      createPlayer({ type: RED_PLAYER, position: { x: 10 } }),
    ];

    this.players.forEach(player => this.world.addBody(player));

    this.ground = createGround();
    this.world.addBody(this.ground);

    this.dynamicObjects = [];

    createTrack(trackData).forEach((object) => {
      this.world.addBody(object);

      if (object.type === CANNON.Body.DYNAMIC) {
        this.dynamicObjects.push(object);
      }
    });
  }

  onSnowdriftCollideHandler = identity;

  set onSnowdriftCollide(fn) {
    this.onSnowdriftCollideHandler = fn;
  }

  clearWorld = () => {
    const coinsToRemove = uniq(flatten(this.players.map(player => player.userData.coinsToRemove)));
    const snowdriftsToExplode = uniq(flatten(this.players.map(player => player.userData.snowdriftsToExplode)));

    coinsToRemove.forEach(body => this.world.remove(body));
    snowdriftsToExplode.forEach(body => this.onSnowdriftCollideHandler(body));

    this.players.forEach((player) => {
      player.userData.coinsToRemove = [];
      player.userData.snowdriftsToExplode = [];
    });
  };

  update() {
    this.players.forEach((player) => {
      player.userData.rotation += this.sensorData.getValue(player.userData.type) * 0.003;
      player.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), player.userData.rotation);
      player.applyLocalForce(new CANNON.Vec3(0, 0, -player.userData.speed), new CANNON.Vec3(0, 0, 0));
    });

    this.world.step(1 / 60);
    this.clearWorld();
  }
}

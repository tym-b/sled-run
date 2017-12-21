import * as CANNON from 'cannon';
import { identity } from 'ramda';
import { flatten, uniq, remove } from 'lodash';

import createGround from './objects/ground';
import createPlayer from './objects/player';
import createWorld from './objects/world';
import createTrack from './objects/track';
import params from '../params';

import { GREEN_PLAYER, RED_PLAYER } from '../../../../../server/helpers';


export default class Physics {
  constructor(trackData, sensorData, audio) {
    this.sensorData = sensorData;
    this.trackData = trackData;
    this.audio = audio;
    this.world = createWorld();

    this.players = [
      createPlayer({
        type: GREEN_PLAYER,
        position: { x: -10 },
        onCollide: this.handlePlayerCollide,
        onFinish: this.handlePlayerFinish,
        onBoostCollect: this.handlePlayerBoostCollect,
      }, this.audio),
      createPlayer({
        type: RED_PLAYER,
        position: { x: 10 },
        onCollide: this.handlePlayerCollide,
        onFinish: this.handlePlayerFinish,
        onBoostCollect: this.handlePlayerBoostCollect,
      }, this.audio),
    ];

    this.players.forEach(player => this.world.addBody(player));

    this.ground = createGround();
    this.world.addBody(this.ground);

    this.dynamicObjects = [];

    createTrack(this.trackData).forEach((object) => {
      this.world.addBody(object);

      if (object.type !== CANNON.Body.STATIC) {
        this.dynamicObjects.push(object);
      }
    });
  }

  onPuddleCollideHandler = identity;
  onFinishHandler = identity;
  onBoostUseHandler = identity;

  set onPuddleCollide(fn) {
    this.onPuddleCollideHandler = fn;
  }

  set onFinish(fn) {
    this.onFinishHandler = fn;
  }

  set onBoostCollect(fn) {
    this.onBoostCollectHandler = fn;
  }

  handlePlayerCollide = (type) => {
    if (this.sensorData && type) {
      this.sensorData.sendPlayerCollideEvent(type);
    }
  };

  handlePlayerFinish = (type) => {
    this.onFinishHandler(type);
  };

  handlePlayerBoostCollect = (type, boosts) => {
    this.onBoostCollectHandler(type, boosts);
  };

  useBoost(type) {
    return this.players[type === GREEN_PLAYER ? 0 : 1].userData.useBoost();
  }

  start = () => {
    this.players.forEach((player) => {
      player.userData.speed = params.INITIAL_SPEED;
    });
  };

  clearWorld = () => {
    const nitrosToRemove = uniq(flatten(this.players.map(player => player.userData.nitrosToRemove)));
    const puddlesToExplode = uniq(flatten(this.players.map(player => player.userData.puddlesToExplode)));

    nitrosToRemove.forEach(body => {
      this.world.remove(body);
      remove(this.dynamicObjects, o => o === body);
    });
    puddlesToExplode.forEach(body => this.onPuddleCollideHandler(body));

    this.players.forEach((player) => {
      player.userData.nitrosToRemove = [];
      player.userData.puddlesToExplode = [];
    });
  };

  update() {
    this.players.forEach((player) => {
      player.userData.angle = this.sensorData.getValue(player.userData.type);
      player.userData.rotation += Math.abs(player.userData.angle) ** params.SENSOR_POWER *
        params.SENSOR_MULTIPLIER * Math.sign(player.userData.angle);
      player.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), player.userData.rotation);
      player.applyLocalForce(new CANNON.Vec3(0, 0, -player.userData.speed), new CANNON.Vec3(0, 0, 0));
    });

    this.world.step(1 / 60);
    this.clearWorld();
  }
}

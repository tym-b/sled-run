import * as THREE from 'three';
import { invokeMap, call, zipObject, keys } from 'lodash';

import objectCreators from './objects';
import createStraightSegment from './straight';
import createLeftSegment from './left';
import createRightSegment from './right';
import createBoostersForSegment from './straight/boosters';
import { TRACK_SEGMENT_STRAIGHT, TRACK_SEGMENT_LEFT, TRACK_SEGMENT_RIGHT } from '../../../track';
import { loadTexture } from '../../utils';
import groundTexture from './textures/ground.jpg';

export default async function createTrack(trackData) {
  const objects = zipObject(keys(objectCreators), await Promise.all(invokeMap(objectCreators, call, '')));
  const materials = {
    ground: new THREE.MeshBasicMaterial({ map: await loadTexture(groundTexture) }),
  };
  const segments = {
    straight: await createStraightSegment(objects, materials),
    left: await createLeftSegment(objects, materials),
    right: await createRightSegment(objects, materials),
  };
  const track = new THREE.Group();

  trackData.forEach(({ type, offset, clockwiseTurns }) => {
    const segment = segments[type].clone();

    segment.position.set(offset.x, 0, -offset.y);
    segment.rotation.set(0, -clockwiseTurns / 2 * Math.PI, 0);
    track.add(segment);
  });

  return track;
}

const changeBoostersPosition = (boosters, offset, clockwiseTurns) => {
  const tmpBoosts = [];
  let tmpBoost = {};

  boosters.forEach((booster) => {
    if (offset) {
      tmpBoost = booster.clone();
      tmpBoost.position.set(tmpBoost.position.x + offset.x, 2, tmpBoost.position.z - offset.y);
      tmpBoost.rotation.set(0, -clockwiseTurns / 2 * Math.PI, 0);
    }
    tmpBoosts.push(tmpBoost);
  });
  return tmpBoosts;
};

export async function createBoosters(boostersData) {
  const objectInstances = zipObject(keys(objectCreators), await Promise.all(invokeMap(objectCreators, call, '')));
  let boosters = [];

  const boostersSegments = {
    straight: await createBoostersForSegment(objectInstances, TRACK_SEGMENT_STRAIGHT),
    left: await createBoostersForSegment(objectInstances, TRACK_SEGMENT_LEFT),
    right: await createBoostersForSegment(objectInstances, TRACK_SEGMENT_RIGHT),
  };

  boostersData.forEach(({ type, offset, clockwiseTurns }) => {
    boosters = boosters.concat(changeBoostersPosition(boostersSegments[type], offset, clockwiseTurns));
  });

  return boosters;
}

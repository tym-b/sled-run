import * as THREE from 'three';
import { invokeMap, call, zipObject, keys } from 'lodash';

import objectCreators from './objects';
import createStraightSegment from './straight';
import createBoostersForStraightSegment from './straight/boosters';
import { nextOffset } from '../../../physics/objects/track/straight';
import { loadTexture } from '../../utils';
import groundTexture from './textures/ground.jpg';

import { TRACK_SEGMENT_STRAIGHT } from '../../..';

export default async function createTrack(trackData) {
  const objectInstances = zipObject(keys(objectCreators), await Promise.all(invokeMap(objectCreators, call, '')));
  const groundMaterial = new THREE.MeshBasicMaterial({ map: await loadTexture(groundTexture) });
  const straightSegment = await createStraightSegment(objectInstances, groundMaterial);
  const track = new THREE.Group();

  trackData.forEach((segmentType, index) => {
    let segment;
    const offsetY = index * nextOffset.y;

    switch (segmentType) {
      case TRACK_SEGMENT_STRAIGHT:
        segment = straightSegment.clone();
        break;
      default:
        throw new Error('Wrong segment type');
    }

    segment.position.setZ(-offsetY);
    track.add(segment);
  });

  return track;
}

const changeBoostersPosition = (boosters, offset) => {
  const tmpBoosts = [];

  boosters.forEach((booster) => {
    if (offset) {
      booster.position.setZ(booster.position.z - nextOffset.y);
    }
    tmpBoosts.push(booster.clone());
  });
  return tmpBoosts;
};


export async function createBoosters(boostersData) {
  const objectInstances = zipObject(keys(objectCreators), await Promise.all(invokeMap(objectCreators, call, '')));
  const straightBoosters = await createBoostersForStraightSegment(objectInstances);
  let boosters = [];

  boostersData.forEach((segmentType, index) => {
    switch (segmentType) {
      case TRACK_SEGMENT_STRAIGHT:
        boosters = boosters.concat(changeBoostersPosition(straightBoosters, index));
        break;
      default:
        throw new Error('Wrong segment type');
    }
  });
  return boosters;
}

import * as THREE from 'three';
import { invokeMap, call, zipObject, keys } from 'lodash';

import objectCreators from './objects';
import createStraightSegment from './straight';
import createLeftSegment from './left';
import createRightSegment from './right';
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

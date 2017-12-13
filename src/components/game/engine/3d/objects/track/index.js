import * as THREE from 'three';
import { invokeMap, call, zipObject, keys } from 'lodash';

import objectCreators from './objects';


export default async function createTrack(trackData) {
  const objects = zipObject(keys(objectCreators), await Promise.all(invokeMap(objectCreators, call, '')));
  const track = new THREE.Group();

  trackData.forEach(({ objectsData, offset, clockwiseTurns }) => {
    const segment = new THREE.Group();

    objectsData.forEach(({ id, type, position, rotation }) => {
      const object = objects[type].clone();

      object.name = id;
      object.rotation.y = rotation / 180 * Math.PI;
      object.position.set(position.x, position.z || 0, -position.y);

      segment.add(object);
    });

    segment.position.set(offset.x, 0, -offset.y);
    segment.rotation.set(0, -clockwiseTurns / 2 * Math.PI, 0);

    track.add(segment);
  });

  return track;
}

import * as THREE from 'three';
import { invokeMap, call, zipObject, keys } from 'lodash';

import objectCreators from './objects';
import createStraightSegment from './straight';
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

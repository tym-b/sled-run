import * as THREE from 'three';

import createRock from './objects/rock';
import createOblongRock from './objects/oblongRock';
import createStraightSegment from './straight';
import { nextOffset } from '../../../physics/objects/track/straight';
import { loadTexture } from '../../utils';
import groundTexture from './textures/ground.jpg';

import { TRACK_SEGMENT_STRAIGHT } from '../../..';

export default async function createTrack(trackData) {
  const rock = await createRock();
  const oblongRock = await createOblongRock();
  const groundMaterial = new THREE.MeshBasicMaterial({ map: await loadTexture(groundTexture) });
  const straightSegment = await createStraightSegment(rock, oblongRock, groundMaterial, groundMaterial);
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

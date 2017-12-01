import * as THREE from 'three';

import createRock from './objects/rock';
import createOblongRock from './objects/oblongRock';
import createStraightSegment from './straight';

import { TRACK_SEGMENT_STRAIGHT } from '../../..';

export default async function createTrack(trackData) {
  const rock = await createRock();
  const oblongRock = await createOblongRock();
  const straightSegment = createStraightSegment(rock, oblongRock);
  const track = new THREE.Group();

  trackData.forEach((segmentType, index) => {
    let segment;
    const offsetY = index * 230;

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

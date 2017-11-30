import * as THREE from 'three';

import { rocksData } from '../../../physics/objects/track';


export default async function createStraightSegment(rockObject) {
  const segment = new THREE.Group();

  rocksData.forEach(rockData => {
    const rock = rockObject.clone();
    const helper = new THREE.BoxHelper(rock, 0xffff00);

    rock.rotation.y = rockData.rotation / 180 * Math.PI;
    rock.position.set(rockData.position.x, 0, -rockData.position.y);

    segment.add(rock, helper);
  });

  return segment;
}

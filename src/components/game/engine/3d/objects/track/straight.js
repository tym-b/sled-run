import * as THREE from 'three';

import { rocksData, oblongRocksData } from '../../../physics/objects/track';


export default async function createStraightSegment(rockObject, oblongRockObject) {
  const segment = new THREE.Group();

  rocksData.forEach(rockData => {
    const rock = rockObject.clone();

    rock.rotation.y = rockData.rotation / 180 * Math.PI;
    rock.position.set(rockData.position.x, 0, -rockData.position.y);

    segment.add(rock);
  });

  oblongRocksData.forEach(rockData => {
    const rock = oblongRockObject.clone();

    rock.rotation.y = rockData.rotation / 180 * Math.PI;
    rock.position.set(rockData.position.x, 0, -rockData.position.y);

    segment.add(rock);
  });

  return segment;
}

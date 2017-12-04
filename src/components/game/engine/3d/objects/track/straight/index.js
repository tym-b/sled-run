import * as THREE from 'three';

import { parseObject } from '../../../utils';
import { rocksData, oblongRocksData } from '../../../../physics/objects/track/straight';
import groundGeometry from './straight.json';


export default async function createStraightSegment(rockObject, oblongRockObject, groundMaterial) {
  const segment = new THREE.Group();
  const ground = new THREE.Mesh(await parseObject(groundGeometry), groundMaterial);

  segment.add(ground);

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

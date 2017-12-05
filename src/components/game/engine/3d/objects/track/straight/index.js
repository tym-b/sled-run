import * as THREE from 'three';

import { parseObject } from '../../../utils';
import { objectsData } from '../../../../physics/objects/track/straight';
import groundGeometry from './straight.json';


export default async function createStraightSegment(objects, groundMaterial) {
  const segment = new THREE.Group();
  const ground = new THREE.Mesh(await parseObject(groundGeometry), groundMaterial);

  segment.add(ground);

  objectsData.forEach(({ type, position, rotation }) => {
    const object = objects[type].clone();

    object.rotation.y = rotation / 180 * Math.PI;
    object.position.set(position.x, 0, -position.y);

    segment.add(object);
  });

  return segment;
}

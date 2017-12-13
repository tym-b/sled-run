import * as THREE from 'three';

import { parseObject } from '../../../utils';
import { objectsData } from '../../../../segmentsData/straight';
import groundGeometry from './straight.json';


export default async function createStraightSegment(objects, materials) {
  const segment = new THREE.Group();
  const ground = new THREE.Mesh(await parseObject(groundGeometry), materials.ground);

  segment.add(ground);

  objectsData.forEach(({ name, type, position, rotation }) => {
    const object = objects[type].clone();

    object.name = name;
    object.rotation.y = rotation / 180 * Math.PI;
    object.position.set(position.x, position.z || 0, -position.y);

    segment.add(object);
  });

  return segment;
}

import * as CANNON from 'cannon';

import rockShape from './untitled.json';
import objectToShape from '../../../../utils/parseObject';

const shape = objectToShape(rockShape);

export const material = new CANNON.Material('rockMaterial');

export default function createRock({ position, rotation }) {
  const rock = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, 0, -position.y),
    shape,
    material,
  });

  rock.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation / 180 * Math.PI);

  return rock;
}

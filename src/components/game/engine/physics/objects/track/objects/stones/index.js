import * as CANNON from 'cannon';

import { material } from '../rock';


export default function createStones({ position, rotation, clockwiseTurns }) {
  const stones = new CANNON.Body({
    position: new CANNON.Vec3(position.x, 0, -position.y),
    material,
    type: CANNON.Body.STATIC,
  });

  stones.addShape(new CANNON.Sphere(8), new CANNON.Vec3(0, -4, 0));

  stones.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation / 180 * Math.PI - clockwiseTurns / 2 * Math.PI);

  return stones;
}

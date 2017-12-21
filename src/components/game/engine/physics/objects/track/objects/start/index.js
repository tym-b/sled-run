import * as CANNON from 'cannon';

import { material } from '../rock';


export default function createSmallRock({ position }) {
  const start = new CANNON.Body({
    position: new CANNON.Vec3(position.x, 0, -position.y),
    material,
    type: CANNON.Body.STATIC,
  });

  start.addShape(new CANNON.Box(new CANNON.Vec3(0.4, 8, 0.4)), new CANNON.Vec3(-15, 0, -30));
  start.addShape(new CANNON.Box(new CANNON.Vec3(0.4, 8, 0.4)), new CANNON.Vec3(15, 0, -30));
  start.addShape(new CANNON.Box(new CANNON.Vec3(50, 2, 1)), new CANNON.Vec3(0, 0, 20));

  return start;
}

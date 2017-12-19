import * as CANNON from 'cannon';

import { material } from '../rock';


export default function createPole({ position }) {
  const pole = new CANNON.Body({
    position: new CANNON.Vec3(position.x, 0, -position.y),
    shape: new CANNON.Box(new CANNON.Vec3(0.3, 5, 0.3)),
    material,
    type: CANNON.Body.STATIC,
  });

  return pole;
}

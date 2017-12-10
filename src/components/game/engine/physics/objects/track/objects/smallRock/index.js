import * as CANNON from 'cannon';

import { material } from '../rock';


const boxes = [
  { size: [11, 6, 2], offset: [7, 3, -7.5], rotation: -0.41 },
  { size: [7.5, 6, 2], offset: [-8, 3, -8], rotation: 0.48 },
  { size: [8, 6, 2], offset: [-7, 3, 8], rotation: -0.4 },
  { size: [10, 6, 2], offset: [8, 3, 8], rotation: 0.35 },
  { size: [2, 6, 6], offset: [16, 3, 1], rotation: 0 },
  { size: [2, 6, 7], offset: [-13, 3, 0.5], rotation: 0.05 },
];

export default function createSmallRock({ position, rotation, clockwiseTurns }) {
  const rock = new CANNON.Body({
    position: new CANNON.Vec3(position.x, 0, -position.y),
    material,
    type: CANNON.Body.STATIC,
  });

  rock.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation / 180 * Math.PI + clockwiseTurns / 2 * Math.PI);

  boxes.forEach((box) => {
    const quaternion = new CANNON.Quaternion();

    quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), box.rotation);
    rock.addShape(
      new CANNON.Box(new CANNON.Vec3(...box.size)),
      new CANNON.Vec3(...box.offset),
      quaternion
    );
  });

  return rock;
}

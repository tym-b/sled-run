import * as CANNON from 'cannon';

import { material } from '../rock';

const boxes = [
  { size: [20, 5, 2], offset: [15, 0, -8], rotation: -0.25 },
  { size: [20, 5, 2], offset: [-22, 0, -8.53], rotation: 0.23 },
  { size: [20, 5, 2], offset: [17, 0, 9], rotation: 0.18 },
  { size: [20, 5, 2], offset: [-21, 0, 8], rotation: -0.2 },
];


export default function createOblongRock({ position, rotation }) {
  const rock = new CANNON.Body({
    position: new CANNON.Vec3(position.x, 5, -position.y),
    material,
    type: CANNON.Body.STATIC,
  });

  boxes.forEach((box) => {
    const quaternion = new CANNON.Quaternion();

    quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), box.rotation);
    rock.addShape(
      new CANNON.Box(new CANNON.Vec3(...box.size)),
      new CANNON.Vec3(...box.offset),
      quaternion
    );
  });

  rock.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation / 180 * Math.PI);

  return rock;
}

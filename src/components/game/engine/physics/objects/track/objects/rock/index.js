import * as CANNON from 'cannon';

export const ROCK_MATERIAL_NAME = 'rockMaterial';
export const material = new CANNON.Material(ROCK_MATERIAL_NAME);


const boxes = [
  { size: [14, 6, 2], offset: [9, 3, -12.5], rotation: -0.43 },
  { size: [11, 6, 2], offset: [-12, 3, -13], rotation: 0.52 },
  { size: [12, 6, 2], offset: [-10, 3, 12], rotation: -0.43 },
  { size: [12, 6, 2], offset: [10, 3, 12], rotation: 0.42 },
  { size: [2, 6, 9], offset: [20.5, 3, 0], rotation: 0 },
  { size: [2, 6, 9], offset: [-20.5, 3, 0], rotation: 0 },
];

export default function createRock({ position, rotation, clockwiseTurns }) {
  const rock = new CANNON.Body({
    position: new CANNON.Vec3(position.x, 0, -position.y),
    material,
    type: CANNON.Body.STATIC,
  });

  rock.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation / 180 * Math.PI - clockwiseTurns / 2 * Math.PI);

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

import * as CANNON from 'cannon';

export const STONE_MATERIAL_NAME = 'stoneMaterial';
export const material = new CANNON.Material(STONE_MATERIAL_NAME);


export default function createStone({ id, position, rotation, clockwiseTurns }) {
  const stone = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(position.x, 1.5, -position.y),
    shape: new CANNON.Box(new CANNON.Vec3(3, 1.5, 3)),
    linearDamping: 0.01,
    angularDamping: 0.99,
    material,
  });

  stone.userData = { name: id };

  stone.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation / 180 * Math.PI - clockwiseTurns / 2 * Math.PI);

  return stone;
}

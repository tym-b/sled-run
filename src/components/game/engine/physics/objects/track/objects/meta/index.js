import * as CANNON from 'cannon';

export const META_MATERIAL_NAME = 'metaMaterial';
export const material = new CANNON.Material(META_MATERIAL_NAME);

export default function createMeta({ position, id, clockwiseTurns }) {
  const meta = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, 2, -position.y),
    shape: new CANNON.Box(new CANNON.Vec3(50, 2, 1)),
    type: CANNON.Body.STATIC,
    material,
  });

  meta.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -clockwiseTurns / 2 * Math.PI);

  meta.collisionResponse = false;

  meta.userData = { name: id };

  return meta;
}

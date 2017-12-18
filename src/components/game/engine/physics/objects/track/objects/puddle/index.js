import * as CANNON from 'cannon';

export const PUDDLE_MATERIAL_NAME = 'puddleMaterial';
export const material = new CANNON.Material(PUDDLE_MATERIAL_NAME);

export default function createPuddle({ position, id }) {
  const puddle = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, -3, -position.y),
    shape: new CANNON.Sphere(7),
    material,
  });

  puddle.collisionResponse = false;

  puddle.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

  puddle.userData = {
    name: id
  };

  return puddle;
}

import * as CANNON from 'cannon';

export const SNOWDRIFT_MATERIAL = 'snowdriftMaterial';
export const material = new CANNON.Material(SNOWDRIFT_MATERIAL);

export default function createSnowdrift({ position, name }) {
  const snowdrift = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, 0.025, -position.y),
    shape: new CANNON.Cylinder(2, 2, 0.1, 8),
    material,
  });

  snowdrift.collisionResponse = false;

  snowdrift.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

  snowdrift.userData = {
    name
  };

  return snowdrift;
}
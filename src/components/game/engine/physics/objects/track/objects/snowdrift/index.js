import * as CANNON from 'cannon';

export const SNOWDRIFT_MATERIAL = 'snowdriftMaterial';
export const material = new CANNON.Material(SNOWDRIFT_MATERIAL);

export default function createDelayer() {
  const snowdrift = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, -0.049, -30),
    shape: new CANNON.Cylinder(4, 4, 0.1, 8),
    material,
  });

  snowdrift.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

  return snowdrift;
}
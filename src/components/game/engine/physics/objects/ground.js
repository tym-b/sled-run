import * as CANNON from 'cannon';


export const material = new CANNON.Material();

export default function createGround() {
  const ground = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    material,
  });

  ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

  return ground;
}

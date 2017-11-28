import * as CANNON from 'cannon';


export const material = new CANNON.Material('rockMaterial');

export default function createRock(position) {
  const rock = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, position.y, position.z),
    shape: new CANNON.Sphere(11),
    material,
  });

  return rock;
}

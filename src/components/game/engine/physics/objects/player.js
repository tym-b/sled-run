import * as CANNON from 'cannon';


export const material = new CANNON.Material('playerMaterial');

export default function createPlayer() {
  const player = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, 5, 0),
    shape: new CANNON.Sphere(1.5),
    fixedRotation: true,
    linearDamping: 0.9,
    material,
  });

  return player;
}

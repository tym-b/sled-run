import * as CANNON from 'cannon';


export const material = new CANNON.Material('playerMaterial');

export default function createPlayer() {
  const player = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, 10, 0),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    fixedRotation: true,
    linearDamping: 0.9,
    material,
  });

  return player;
}

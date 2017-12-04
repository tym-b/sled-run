import * as CANNON from 'cannon';


export const material = new CANNON.Material('coinMaterial');

export default function createCoin({ position }) {
  const coin = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, 2, -position.y),
    shape: new CANNON.Sphere(0.7),
    material,
  });

  coin.collisionResponse = false;

  return coin;
}

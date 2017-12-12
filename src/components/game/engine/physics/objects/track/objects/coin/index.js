import * as CANNON from 'cannon';

export const COIN_MATERIAL = 'coinMaterial';
export const material = new CANNON.Material(COIN_MATERIAL);

export default function createCoin({ position, name }) {
  const coin = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, 2, -position.y),
    shape: new CANNON.Sphere(0.7),
    type: CANNON.Body.STATIC,
    material,
  });

  coin.collisionResponse = false;

  coin.userData = {
    name
  };

  return coin;
}

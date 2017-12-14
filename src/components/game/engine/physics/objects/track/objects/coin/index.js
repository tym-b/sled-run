import * as CANNON from 'cannon';

export const COIN_MATERIAL_NAME = 'coinMaterial';
export const material = new CANNON.Material(COIN_MATERIAL_NAME);

export default function createCoin({ position, id }) {
  const coin = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, position.z, -position.y),
    shape: new CANNON.Sphere(1.4),
    type: CANNON.Body.STATIC,
    material,
  });

  coin.collisionResponse = false;

  coin.userData = {
    name: id,
  };

  return coin;
}

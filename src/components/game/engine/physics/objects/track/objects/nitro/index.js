import * as CANNON from 'cannon';

export const NITRO_MATERIAL_NAME = 'nitroMaterial';
export const material = new CANNON.Material(NITRO_MATERIAL_NAME);

export default function createNitro({ position, id }) {
  const nitro = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, position.z, -position.y),
    shape: new CANNON.Box(new CANNON.Vec3(1.2, 1.2, 1.2)),
    type: CANNON.Body.STATIC,
    material,
  });

  nitro.collisionResponse = false;
  nitro.userData = { name: id };

  return nitro;
}

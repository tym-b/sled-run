import * as CANNON from 'cannon';

export const META_MATERIAL_NAME = 'metaMaterial';
export const material = new CANNON.Material(META_MATERIAL_NAME);

export default function createMeta({ position, id }) {
  const meta = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    type: CANNON.Body.STATIC,
    material,
  });

  meta.collisionResponse = false;

  meta.userData = {
    name: id,
  };

  return meta;
}

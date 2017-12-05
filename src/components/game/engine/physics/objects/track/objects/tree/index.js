import * as CANNON from 'cannon';
import { times } from 'lodash';

export const material = new CANNON.Material();


export default function createTree({ position }) {
  const tree = new CANNON.Body({
    position: new CANNON.Vec3(position.x, 0, -position.y),
    material,
    type: CANNON.Body.STATIC,
  });

  times(2, sphere => tree.addShape(
    new CANNON.Sphere(1),
    new CANNON.Vec3(0, sphere * 3, 0),
  ));

  return tree;
}

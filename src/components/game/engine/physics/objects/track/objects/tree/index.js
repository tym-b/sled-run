import * as CANNON from 'cannon';
import { times } from 'lodash';

export const material = new CANNON.Material('treeMaterial');


export default function createTree({ position }) {
  const tree = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, 0, -position.y),
    material,
  });

  times(2, sphere => tree.addShape(
    new CANNON.Sphere(1),
    new CANNON.Vec3(0, sphere * 3, 0),
  ));

  return tree;
}

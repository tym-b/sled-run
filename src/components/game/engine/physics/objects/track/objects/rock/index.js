import * as CANNON from 'cannon';


export const material = new CANNON.Material('rockMaterial');

const boxes = [
  { size: [15, 5, 2], offset: [10, 0, -12], rotation: -0.43 },
  { size: [12, 5, 2], offset: [-12, 0, -13], rotation: 0.52 },
  { size: [12, 5, 2], offset: [-10, 0, 12], rotation: -0.43 },
  { size: [12, 5, 2], offset: [10, 0, 12], rotation: 0.42 },
];


export default function createRock({ position, rotation }) {
  const rock = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, 0, -position.y),
    material,
  });

  boxes.forEach((box) => {
    const quaternion = new CANNON.Quaternion();

    quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), box.rotation);
    rock.addShape(
      new CANNON.Box(new CANNON.Vec3(...box.size)),
      new CANNON.Vec3(...box.offset),
      quaternion
    );
  });

  rock.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation / 180 * Math.PI);

  return rock;
}

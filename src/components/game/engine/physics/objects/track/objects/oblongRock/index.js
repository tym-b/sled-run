import * as CANNON from 'cannon';

import { material } from '../rock';
import oblongRockShape from './oblongRock.json';
import objectToShape from '../../../../utils/parseObject';


export default function createOblongRock({ position, rotation }) {
  const rock = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(position.x, 0, -position.y),
    shape: objectToShape(oblongRockShape),
    material,
  });

  rock.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), rotation / 180 * Math.PI);

  return rock;
}

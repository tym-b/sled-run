import { createGround } from '../../../../utils';
import geometry from './groundRight.json';


export default async function createGroundStraight() {
  return createGround(geometry);
}

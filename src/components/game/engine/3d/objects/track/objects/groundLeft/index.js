import { createGround } from '../../../../utils';
import geometry from './groundLeft.json';


export default async function createGroundStraight() {
  return createGround(geometry);
}

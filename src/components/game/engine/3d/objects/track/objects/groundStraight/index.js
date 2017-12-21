import { createGround } from '../../../../utils';
import geometry from './groundStraight.json';


export default async function createGroundStraight() {
  return createGround(geometry);
}

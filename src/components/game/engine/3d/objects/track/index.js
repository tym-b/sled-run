import createRock from './objects/rock';
import createOblongRock from './objects/oblongRock';
import createStraightSegment from './straight';

export default async function createTrack() {
  const rock = await createRock();
  const oblongRock = await createOblongRock();

  return createStraightSegment(rock, oblongRock);
}

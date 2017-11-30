import createRock from './objects/rock';
import createStraightSegment from './straight';

export default async function createTrack() {
  const rock = await createRock();

  return createStraightSegment(rock);
}

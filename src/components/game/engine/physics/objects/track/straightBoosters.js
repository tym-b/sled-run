import { flatten } from 'lodash';

import objectCreators from './objects';
import { turnClockwise, TRACK_SEGMENT_STRAIGHT, TRACK_SEGMENT_LEFT, TRACK_SEGMENT_RIGHT } from '../../../track';

export const objectsData = {
  [TRACK_SEGMENT_STRAIGHT]: [
    { type: 'coin', position: { x: 1, z: 2, y: 20 }, rotation: 0 },
    { type: 'coin', position: { x: 4, z: 2, y: 80 }, rotation: 0 },
  ],
  [TRACK_SEGMENT_LEFT]: [],
  [TRACK_SEGMENT_RIGHT]: [],
};

export default function createBoostersForSegment(offset, clockwiseTurns, type) {
  const objects = objectsData[type];

  return flatten(objects
    .map(data => {
      const realPositon = turnClockwise(data.position, clockwiseTurns);

      return {
        ...data,
        position: {
          x: realPositon.x + offset.x,
          y: realPositon.y + offset.y,
        },
        clockwiseTurns,
      };
    })
    .map(data => objectCreators[data.type](data)));
}

import { merge, flatten } from 'lodash';

import objectCreators from './objects';

export const objectsData = [
  { type: 'coin', position: { x: 1, z: 2, y: 20 }, rotation: 0 },
  { type: 'coin', position: { x: 2, z: 2, y: 40 }, rotation: 0 },
  { type: 'coin', position: { x: 3, z: 2, y: 60 }, rotation: 0 },
  { type: 'coin', position: { x: 4, z: 2, y: 80 }, rotation: 0 },
];

export default function createBoostersForStraightSegment(offset = 0) {
  const objects = objectsData
    .map(data => merge({}, data, { position: { y: data.position.y + offset, offset: 0 } }))
    .map(data => objectCreators[data.type](data));

  return flatten(objects);
}

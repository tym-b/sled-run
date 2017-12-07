import { merge, flatten } from 'lodash';

import objectCreators from './objects';

export const objectsData = [
  { type: 'rock', position: { x: -42.0559, y: -1.27705 }, rotation: -90 },
  { type: 'rock', position: { x: -42.0559, y: 100.766 }, rotation: 90 },
  { type: 'rock', position: { x: 41.4711, y: 98.8481 }, rotation: 90 },
  { type: 'rock', position: { x: 41.4711, y: 0 }, rotation: 90 },
  { type: 'oblongRock', position: { x: -40.0473, y: 49.0139 }, rotation: -90 },
  { type: 'oblongRock', position: { x: -43.7789, y: 156.137 }, rotation: -90 },
  { type: 'oblongRock', position: { x: 41.9085, y: 150.63 }, rotation: 90 },
  { type: 'oblongRock', position: { x: 41.2628, y: 51.6223 }, rotation: -90 },
  { type: 'tree', position: { x: 20, y: 5 }, rotation: 90 },
  { type: 'tree', position: { x: -15, y: 80 }, rotation: 0 },
  { type: 'tree', position: { x: 3, y: 150 }, rotation: -90 },
  { type: 'coin', position: { x: 1, z: 2, y: 20 }, rotation: 0 },
  { type: 'coin', position: { x: 2, z: 2, y: 40 }, rotation: 0 },
  { type: 'coin', position: { x: 3, z: 2, y: 60 }, rotation: 0 },
  { type: 'coin', position: { x: 4, z: 2, y: 80 }, rotation: 0 },
];

export const nextOffset = { x: 0, y: 200 };

export default function createStraightSegment(offset = 0) {
  const objects = objectsData
    .map(data => merge({}, data, { position: { y: data.position.y + offset } }))
    .map(data => objectCreators[data.type](data));

  return flatten(objects);
}

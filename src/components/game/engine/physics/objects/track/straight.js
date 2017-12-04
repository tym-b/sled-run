import { merge } from 'lodash';

import createRock from './objects/rock';
import createOblongRock from './objects/oblongRock';


export const rocksData = [
  { position: { x: -42.0559, y: -1.27705 }, rotation: -90 },
  { position: { x: -42.0559, y: 100.766 }, rotation: 90 },
  { position: { x: 41.4711, y: 98.8481 }, rotation: 90 },
  { position: { x: 41.4711, y: 0 }, rotation: 90 },
];

export const oblongRocksData = [
  { position: { x: -40.0473, y: 49.0139 }, rotation: -90 },
  { position: { x: -43.7789, y: 156.137 }, rotation: -90 },
  { position: { x: 41.9085, y: 150.63 }, rotation: 90 },
  { position: { x: 41.2628, y: 51.6223 }, rotation: -90 },
];

export const nextOffset = { x: 0, y: 200 };

export default function createStraightSegment(offset = 0) {
  const addOffset = data => merge({}, data, { position: { y: data.position.y + offset } });
  const rocks = rocksData.map(addOffset).map(createRock);
  const oblongRocks = oblongRocksData.map(addOffset).map(createOblongRock);

  return [
    ...rocks,
    ...oblongRocks,
  ];
}

import createRock from './objects/rock';

export const rocksData = [
  { position: { x: -42.0559, y: -1.27705 }, rotation: -90 },
  { position: { x: -42.0559, y: 100.766 }, rotation: 90 },
  { position: { x: -42.1559, y: 200.266 }, rotation: -90 },
  { position: { x: 41.4711, y: 200.266 }, rotation: -90 },
  { position: { x: 41.4711, y: 98.8481 }, rotation: 90 },
  { position: { x: 41.4711, y: 0 }, rotation: 90 },
];

export default function createTrack() {
  return rocksData.map(createRock);
}

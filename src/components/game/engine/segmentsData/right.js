import { sample } from 'lodash';


export const boundaries = [
  { type: 'groundRight', position: { x: 0, y: 0 }, rotation: 0 },
  { type: 'rock', position: { x: -46.0559, y: -1.27705 }, rotation: -270 },
  { type: 'rock', position: { x: 112.907, y: 202.843 }, rotation: 6.84001 },
  { type: 'rock', position: { x: 10.9203, y: 158.846 }, rotation: 47.4766 },
  { type: 'rock', position: { x: 76.396, y: 195.541 }, rotation: 5.817 },
  { type: 'rock', position: { x: -38.4226, y: 105.338 }, rotation: -292.319 },
  { type: 'rock', position: { x: 104.05, y: 83.1658 }, rotation: 25.6042 },
  { type: 'rock', position: { x: 47.4711, y: 0 }, rotation: -270 },
  { type: 'smallRock', position: { x: 72.6721, y: 62.4776 }, rotation: -298.502 },
  { type: 'smallRock', position: { x: -16.295, y: 131.367 }, rotation: 42.0683 },
  { type: 'smallRock', position: { x: 52.2666, y: 35.125 }, rotation: 66.8216 },
  { type: 'smallRock', position: { x: 44.0506, y: 180.307 }, rotation: 35.1951 },
  { type: 'smallRock', position: { x: -43.7789, y: 64.2056 }, rotation: 79.5349 },
  { type: 'smallRock', position: { x: -41.2053, y: 33.0846 }, rotation: 85.5863 },
  { type: 'pole', position: { x: -27, y: 0 }, rotation: -90 },
  { type: 'pole', position: { x: 27, y: 0 }, rotation: -90 },
  { type: 'pole', position: { x: 31, y: 18.5 }, rotation: -100 },
  { type: 'pole', position: { x: -25, y: 20 }, rotation: -100 },
  { type: 'pole', position: { x: 35, y: 36 }, rotation: -110 },
  { type: 'pole', position: { x: -22, y: 42 }, rotation: -110 },
  { type: 'pole', position: { x: 42, y: 52 }, rotation: -120 },
  { type: 'pole', position: { x: -16, y: 64 }, rotation: -120 },
  { type: 'pole', position: { x: 50, y: 68 }, rotation: -130 },
  { type: 'pole', position: { x: -8, y: 86 }, rotation: -130 },
  { type: 'pole', position: { x: 60, y: 82 }, rotation: -140 },
  { type: 'pole', position: { x: 4, y: 110 }, rotation: -140 },
  { type: 'pole', position: { x: 74, y: 96 }, rotation: -150 },
  { type: 'pole', position: { x: 24, y: 130 }, rotation: -150 },
  { type: 'pole', position: { x: 92, y: 108 }, rotation: -160 },
  { type: 'pole', position: { x: 46, y: 148 }, rotation: -155 },
  { type: 'pole', position: { x: 74, y: 162 }, rotation: -160 },
  { type: 'pole', position: { x: 108, y: 117 }, rotation: -170 },
  { type: 'pole', position: { x: 100, y: 170 }, rotation: -170 },
  { type: 'pole', position: { x: 128, y: 122 }, rotation: -180 },
  { type: 'pole', position: { x: 126, y: 174 }, rotation: -180 },
];

export const objects = [
  [
    { type: 'tree', position: { x: 10, y: 40 }, rotation: 0 },
    { type: 'tree', position: { x: 0, y: 100 }, rotation: -30 },
    { type: 'tree', position: { x: 40, y: 180 }, rotation: 0 },
    { type: 'stone', position: { x: 90, y: 150 }, rotation: 0 },
    { type: 'tree', position: { x: 65, y: 140 }, rotation: -70 },
    { type: 'nitro', position: { x: 75, z: 2, y: 115 }, rotation: 0 },
    { type: 'tree', position: { x: 40, y: 180 }, rotation: 0 },
    { type: 'tree', position: { x: 40, y: 80 }, rotation: -45 },
    { type: 'tree', position: { x: 35, y: 85 }, rotation: -45 },
    { type: 'puddle', position: { x: 60, y: 95 }, rotation: 0 },
  ],
  [
    { type: 'tree', position: { x: 20, y: 110 }, rotation: -55 },
    { type: 'stone', position: { x: 35, y: 65 }, rotation: 0 },
    { type: 'puddle', position: { x: 120, y: 130 }, rotation: 0 },
    { type: 'puddle', position: { x: 20, y: 20 }, rotation: 0 },
    { type: 'stone', position: { x: 50, y: 120 }, rotation: 0 },
    { type: 'tree', position: { x: 85, y: 140 }, rotation: -75 },
    { type: 'tree', position: { x: 73, y: 145 }, rotation: -75 },
    { type: 'stone', position: { x: -10, y: 30 }, rotation: 0 },
  ],
];

export const nextSegment = {
  offset: { x: 143, y: 150 },
  clockwiseTurns: 1,
};

export default function createSegment() {
  return [
    ...boundaries,
    ...sample(objects),
  ];
}

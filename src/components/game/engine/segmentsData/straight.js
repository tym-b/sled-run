import { sample } from 'lodash';

export const boundaries = [
  { type: 'groundStraight', position: { x: 0, y: 0 }, rotation: 0 },
  { type: 'rock', position: { x: -42.0559, y: -1.27705 }, rotation: 90 },
  { type: 'rock', position: { x: -42.0559, y: 100.766 }, rotation: 90 },
  { type: 'rock', position: { x: 41.4711, y: 98.8481 }, rotation: 90 },
  { type: 'rock', position: { x: 41.4711, y: 0 }, rotation: 90 },
  { type: 'smallRock', position: { x: 41.2628, y: 66.693 }, rotation: -90 },
  { type: 'smallRock', position: { x: 41.2628, y: 166.16 }, rotation: 90 },
  { type: 'smallRock', position: { x: 41.9085, y: 132.922 }, rotation: 90 },
  { type: 'smallRock', position: { x: 41.9085, y: 33.4556 }, rotation: 90 },
  { type: 'smallRock', position: { x: -43.7682, y: 132.922 }, rotation: 90 },
  { type: 'smallRock', position: { x: -43.7682, y: 64.2056 }, rotation: 90 },
  { type: 'smallRock', position: { x: -44.4139, y: 166.16 }, rotation: 90 },
  { type: 'smallRock', position: { x: -41.2053, y: 33.0846 }, rotation: 90 },
  { type: 'pole', position: { x: -27, y: 30 }, rotation: -90 },
  { type: 'pole', position: { x: 27, y: 30 }, rotation: -90 },
  { type: 'pole', position: { x: -27, y: 60 }, rotation: -90 },
  { type: 'pole', position: { x: 27, y: 60 }, rotation: -90 },
  { type: 'pole', position: { x: -27, y: 90 }, rotation: -90 },
  { type: 'pole', position: { x: 23, y: 90 }, rotation: -90 },
  { type: 'pole', position: { x: -27, y: 120 }, rotation: -90 },
  { type: 'pole', position: { x: 27, y: 120 }, rotation: -90 },
  { type: 'pole', position: { x: -27, y: 150 }, rotation: -90 },
  { type: 'pole', position: { x: 27, y: 150 }, rotation: -90 },
];

export const objects = [
  [
    { type: 'tree', position: { x: 20, y: 5 }, rotation: 0 },
    { type: 'tree', position: { x: -20, y: 15 }, rotation: 0 },
    { type: 'tree', position: { x: -11, y: 40 }, rotation: 0 },
    { type: 'tree', position: { x: 10, y: 60 }, rotation: 0 },
    { type: 'ramp', position: { x: 0, y: 100 }, rotation: 0 },
    { type: 'nitro', position: { x: 0, z: 7, y: 115 }, rotation: 0 },
    { type: 'stone', position: { x: -18, y: 90 }, rotation: 0 },
    { type: 'stone', position: { x: 16, y: 105 }, rotation: 0 },
    { type: 'tree', position: { x: 0, y: 135 }, rotation: 0 },
    { type: 'tree', position: { x: 19, y: 150 }, rotation: 0 },
    { type: 'tree', position: { x: -20, y: 155 }, rotation: 0 },
  ],
  [
    { type: 'tree', position: { x: 20, y: 5 }, rotation: 0 },
    { type: 'tree', position: { x: -15, y: 80 }, rotation: 0 },
    { type: 'tree', position: { x: 3, y: 150 }, rotation: 0 },
    { type: 'nitro', position: { x: -10, z: 2, y: 40 }, rotation: 0 },
    { type: 'nitro', position: { x: 10, z: 2, y: 40 }, rotation: 0 },
    { type: 'tree', position: { x: -15, y: 80 }, rotation: 0 },
    { type: 'tree', position: { x: 18, y: 85 }, rotation: 0 },
    { type: 'puddle', position: { x: 10, z: 0, y: 120 }, rotation: 0 },
    { type: 'puddle', position: { x: -10, z: 0, y: 120 }, rotation: 0 },
  ],
  [
    { type: 'puddle', position: { x: 10, z: 0, y: 40 }, rotation: 0 },
    { type: 'puddle', position: { x: -10, z: 0, y: 50 }, rotation: 0 },
    { type: 'ramp', position: { x: 0, z: 0, y: 60 }, rotation: 0 },
    { type: 'stone', position: { x: -5, z: 0, y: 130 }, rotation: 0 },
    { type: 'stone', position: { x: 3, z: 0, y: 137 }, rotation: 0 },
    { type: 'tree', position: { x: -13, z: 0, y: 90 }, rotation: 0 },
    { type: 'tree', position: { x: 18, z: 0, y: 160 }, rotation: 0 },
    { type: 'tree', position: { x: -20, z: 0, y: 190 }, rotation: 0 },
  ],
  [
    { type: 'tree', position: { x: -9, z: 0, y: 30 }, rotation: 0 },
    { type: 'tree', position: { x: -2, z: 0, y: 100 }, rotation: 0 },
    { type: 'stone', position: { x: -15, z: 0, y: 72 }, rotation: 0 },
    { type: 'ramp', position: { x: 10, z: 0, y: 60 }, rotation: 0 },
    { type: 'stone', position: { x: 15, z: 0, y: 120 }, rotation: 0 },
    { type: 'tree', position: { x: -25, z: 0, y: 160 }, rotation: 0 },
    { type: 'nitro', position: { x: -20, z: 2, y: 120 }, rotation: 0 },
  ],
  [
    { type: 'tree', position: { x: 9, z: 0, y: 30 }, rotation: 0 },
    { type: 'tree', position: { x: 2, z: 0, y: 100 }, rotation: 0 },
    { type: 'stone', position: { x: 15, z: 0, y: 72 }, rotation: 0 },
    { type: 'ramp', position: { x: -10, z: 0, y: 60 }, rotation: 0 },
    { type: 'stone', position: { x: -15, z: 0, y: 120 }, rotation: 0 },
    { type: 'tree', position: { x: 25, z: 0, y: 160 }, rotation: 0 },
    { type: 'nitro', position: { x: 20, z: 2, y: 120 }, rotation: 0 },
  ],
  [
    { type: 'puddle', position: { x: 7, z: 0, y: 50 }, rotation: 0 },
    { type: 'tree', position: { x: 12, z: 0, y: 110 }, rotation: 0 },
    { type: 'tree', position: { x: -14, z: 0, y: 130 }, rotation: 0 },
    { type: 'stone', position: { x: -5, z: 0, y: 160 }, rotation: 0 },
  ],
  [
    { type: 'puddle', position: { x: -7, z: 0, y: 50 }, rotation: 0 },
    { type: 'tree', position: { x: -12, z: 0, y: 110 }, rotation: 0 },
    { type: 'tree', position: { x: 14, z: 0, y: 130 }, rotation: 0 },
    { type: 'stone', position: { x: 5, z: 0, y: 160 }, rotation: 0 },
  ],
  [
    { type: 'nitro', position: { x: 0, z: 2, y: 40 }, rotation: 0 },
    { type: 'stone', position: { x: -1, z: 0, y: 70 }, rotation: 0 },
    { type: 'tree', position: { x: -11, z: 0, y: 110 }, rotation: 0 },
    { type: 'tree', position: { x: 9, z: 0, y: 130 }, rotation: 0 },
  ]
];

export const nextSegment = {
  offset: { x: 0, y: 200 },
  clockwiseTurns: 0,
};

export default function createSegment() {
  return [
    ...boundaries,
    ...sample(objects),
  ];
}

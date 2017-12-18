import { sample } from 'lodash';


export const boundaries = [
  { type: 'groundLeft', position: { x: 0, y: 0 }, rotation: 0 },
  { type: 'rock', position: { x: 46.354, y: 74.9392 }, rotation: 94.2 },
  { type: 'rock', position: { x: 9.65944, y: 140.415 }, rotation: -222.5 },
  { type: 'rock', position: { x: 53.6561, y: 38.4287 }, rotation: -273.2 },
  { type: 'rock', position: { x: -66.021, y: 47.2848 }, rotation: -264.4 },
  { type: 'rock', position: { x: -52.7517, y: 185.568 }, rotation: 157.7 },
  { type: 'smallRock', position: { x: -114.062, y: 99.0686 }, rotation: -203.2 },
  { type: 'smallRock', position: { x: -17.8195, y: 167.63 }, rotation: -217.9 },
  { type: 'smallRock', position: { x: -52.0717, y: 10.5967 }, rotation: -266.9 },
  { type: 'smallRock', position: { x: -86.7093, y: 78.6631 }, rotation: 131.5 },
  { type: 'smallRock', position: { x: 31.1205, y: 107.285 }, rotation: -234.8 },
  { type: 'smallRock', position: { x: 55.2016, y: 1.16933 }, rotation: 91.8 },
  { type: 'smallRock', position: { x: -116.102, y: 192.541 }, rotation: 174.4 },
  { type: 'smallRock', position: { x: -84.9812, y: 195.114 }, rotation: -190.5 },
];

export const objects = [
  [
    { type: 'tree', position: { x: 10, y: 40 }, rotation: 0 },
    { type: 'tree', position: { x: 5, y: 100 }, rotation: 30 },
    { type: 'tree', position: { x: -15, y: 120 }, rotation: 45 },
    { type: 'tree', position: { x: -40, y: 180 }, rotation: 0 },
    { type: 'stone', position: { x: -90, y: 150 }, rotation: 0 },
    { type: 'tree', position: { x: -90, y: 170 }, rotation: 70 },
    { type: 'nitro', position: { x: -50, z: 2, y: 80 }, rotation: 0 },
    { type: 'tree', position: { x: -40, y: 180 }, rotation: 0 },
    { type: 'tree', position: { x: -40, y: 100 }, rotation: 45 },
    { type: 'tree', position: { x: -35, y: 105 }, rotation: 45 },
    { type: 'puddle', position: { x: -80, y: 110 }, rotation: 0 },
  ],
  [
    { type: 'tree', position: { x: -20, y: 110 }, rotation: 65 },
    { type: 'tree', position: { x: -25, y: 115 }, rotation: 65 },
    { type: 'stone', position: { x: -45, y: 75 }, rotation: 0 },
    { type: 'puddle', position: { x: -45, y: 140 }, rotation: 0 },
    { type: 'puddle', position: { x: -85, y: 170 }, rotation: 0 },
    { type: 'stone', position: { x: -55, y: 110 }, rotation: 0 },
    { type: 'tree', position: { x: -85, y: 140 }, rotation: 85 },
    { type: 'tree', position: { x: -88, y: 135 }, rotation: 85 },
    { type: 'tree', position: { x: -73, y: 145 }, rotation: 85 },
    { type: 'stone', position: { x: 10, y: 30 }, rotation: 0 },
  ],
];

export const nextSegment = {
  offset: { x: -148, y: 150 },
  clockwiseTurns: -1,
};

export default function createSegment() {
  return [
    ...boundaries,
    ...sample(objects),
  ];
}

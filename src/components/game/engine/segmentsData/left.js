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
  { type: 'pole', position: { x: -27, y: 0 }, rotation: -90 },
  { type: 'pole', position: { x: 27, y: 0 }, rotation: -90 },
  { type: 'pole', position: { x: -31, y: 18.5 }, rotation: -80 },
  { type: 'pole', position: { x: 25, y: 20 }, rotation: -80 },
  { type: 'pole', position: { x: -35, y: 36 }, rotation: -70 },
  { type: 'pole', position: { x: 22, y: 42 }, rotation: -70 },
  { type: 'pole', position: { x: -42, y: 52 }, rotation: -60 },
  { type: 'pole', position: { x: 16, y: 64 }, rotation: -60 },
  { type: 'pole', position: { x: -50, y: 68 }, rotation: -50 },
  { type: 'pole', position: { x: 8, y: 86 }, rotation: -50 },
  { type: 'pole', position: { x: -60, y: 82 }, rotation: -40 },
  { type: 'pole', position: { x: -4, y: 110 }, rotation: -40 },
  { type: 'pole', position: { x: -74, y: 96 }, rotation: -30 },
  { type: 'pole', position: { x: -24, y: 130 }, rotation: -30 },
  { type: 'pole', position: { x: -92, y: 108 }, rotation: -20 },
  { type: 'pole', position: { x: -46, y: 148 }, rotation: -25 },
  { type: 'pole', position: { x: -74, y: 162 }, rotation: -20 },
  { type: 'pole', position: { x: -108, y: 117 }, rotation: -10 },
  { type: 'pole', position: { x: -100, y: 170 }, rotation: -10 },
  { type: 'pole', position: { x: -128, y: 122 }, rotation: 0 },
  { type: 'pole', position: { x: -126, y: 174 }, rotation: 0 },
];

export const objects = [
  [
    { type: 'tree', position: { x: -10, y: 40 }, rotation: 0 },
    { type: 'tree', position: { x: 0, y: 100 }, rotation: 30 },
    { type: 'tree', position: { x: -40, y: 180 }, rotation: 0 },
    { type: 'stone', position: { x: -90, y: 150 }, rotation: 0 },
    { type: 'tree', position: { x: -65, y: 140 }, rotation: 70 },
    { type: 'nitro', position: { x: -75, z: 2, y: 115 }, rotation: 0 },
    { type: 'tree', position: { x: -40, y: 180 }, rotation: 0 },
    { type: 'tree', position: { x: -40, y: 80 }, rotation: 45 },
    { type: 'tree', position: { x: -35, y: 85 }, rotation: 45 },
    { type: 'puddle', position: { x: -60, y: 95 }, rotation: 0 },
  ],
  [
    { type: 'tree', position: { x: -20, y: 110 }, rotation: 55 },
    { type: 'stone', position: { x: -35, y: 65 }, rotation: 0 },
    { type: 'puddle', position: { x: -120, y: 130 }, rotation: 0 },
    { type: 'puddle', position: { x: -20, y: 20 }, rotation: 0 },
    { type: 'stone', position: { x: -50, y: 120 }, rotation: 0 },
    { type: 'tree', position: { x: -85, y: 140 }, rotation: 75 },
    { type: 'tree', position: { x: -73, y: 145 }, rotation: 75 },
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

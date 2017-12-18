import { boundaries, nextSegment } from './straight';


export { nextSegment };

export default function createSegment() {
  return [
    ...boundaries,
    { type: 'meta', position: { x: 0, z: 0, y: 0 }, rotation: 0 },
  ];
}

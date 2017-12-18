import { boundaries, nextSegment } from './straight';


export { nextSegment };

export default function createSegment() {
  return [
    ...boundaries,
    { type: 'start', position: { x: 0, y: 0 }, rotation: 0 },
  ];
}

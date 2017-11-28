import * as THREE from 'three';
import { range, random, last } from 'lodash';

const STEPS_PER_SEGMENT = 3;
const TRACK_WIDTH = 40;

const getStraightSegment = (start = 0) => Array(STEPS_PER_SEGMENT).fill(start);
const getLeftSegment = (start = 0) =>
  range(0, 1 + (1 / STEPS_PER_SEGMENT), 1 / STEPS_PER_SEGMENT)
    .map(step => (Math.sin(Math.PI * step - Math.PI / 2) + 1) * 0.5 + start);
const getRightSegment = (start = 0) =>
  range(0, 1 + (1 / STEPS_PER_SEGMENT), 1 / STEPS_PER_SEGMENT)
    .map(step => (Math.sin(Math.PI / 2 + Math.PI * step) - 1) * 0.5 + start);

const generators = [getStraightSegment, getLeftSegment, getRightSegment];

export default function generateRocks(segments = 10) {
  return range(segments)
    .reduce((points) => {
      const generator = generators[random(0, 2)];
      const lastPoint = last(points);

      return points.concat(generator(lastPoint));
    }, [])
    .reduce((positions, point, index) => positions.concat([
      new THREE.Vector3(point * TRACK_WIDTH - TRACK_WIDTH + random(-3, 3), 0, -index * 45 + random(-10, 10)),
      new THREE.Vector3(point * TRACK_WIDTH + TRACK_WIDTH + random(-3, 3), 0, -index * 45 + random(-10, 10)),
    ]), []);
}

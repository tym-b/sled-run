import { flatten } from 'lodash';

import objectCreators from './objects';
import { turnClockwise } from '../../../track';
import createStraightSegment, { nextOffset } from './straight';
import createBoostersForStraightSegment from './straightBoosters';
import { TRACK_SEGMENT_STRAIGHT } from '../../..';


export default function createTrack(trackData) {
  return flatten(trackData
    .map(({ objectsData, offset, clockwiseTurns }) => objectsData
      .map(data => {
        const realPositon = turnClockwise(data.position, clockwiseTurns);

        return {
          ...data,
          position: {
            x: realPositon.x + offset.x,
            y: realPositon.y + offset.y,
          },
          clockwiseTurns,
        };
      })))
    .map(data => objectCreators[data.type](data));
}

export function createTrackBoosters(trackData) {
  return flatten(trackData.map((segmentType, index) => {
    const offsetY = index * nextOffset.y;

    switch (segmentType) {
      case TRACK_SEGMENT_STRAIGHT:
        return createBoostersForStraightSegment(offsetY);
      default:
        return [];
    }
  }));
}

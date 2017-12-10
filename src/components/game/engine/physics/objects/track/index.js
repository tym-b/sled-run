import { flatten } from 'lodash';

import objectCreators from './objects';
import { turnClockwise } from '../../../track';
import createBoostersForSegment from './straightBoosters';


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

export async function createTrackBoosters(trackData) {
  return flatten(trackData.map(({ type, offset, clockwiseTurns }) =>
    createBoostersForSegment(offset, clockwiseTurns, type)
  ));
}

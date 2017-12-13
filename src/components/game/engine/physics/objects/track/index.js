import { flatten } from 'lodash';

import objectCreators from './objects';
import { turnClockwise } from '../../../track';


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

import { last } from 'lodash';

import segmentsData from './segmentsData';

export const TRACK_SEGMENT_STRAIGHT = 'straight';
export const TRACK_SEGMENT_LEFT = 'left';
export const TRACK_SEGMENT_RIGHT = 'right';


export function turnClockwise({ x, y }, turns) {
  const absTurns = turns > 0 ? turns % 4 : 4 + turns % 4;

  if (absTurns === 1) {
    return { x: y, y: -x };
  }

  if (absTurns === 2) {
    return { x: -x, y: -y };
  }

  if (absTurns === 3) {
    return { x: -y, y: x };
  }

  return { x, y };
}


export default function createTrack(trackData) {
  return trackData
    .map((segmentType) => ({
      type: segmentType,
      ...segmentsData[segmentType],
    }))
    .reduce((segments, segment) => {
      const prevSegment = last(segments);

      if (prevSegment) {
        const realOffset = turnClockwise(prevSegment.nextSegment.offset, prevSegment.clockwiseTurns);

        return segments.concat({
          ...segment,
          offset: {
            x: prevSegment.offset.x + realOffset.x,
            y: prevSegment.offset.y + realOffset.y,
          },
          clockwiseTurns: prevSegment.clockwiseTurns + prevSegment.nextSegment.clockwiseTurns,
        });
      }

      return segments.concat({
        ...segment,
        offset: { x: 0, y: 0 },
        clockwiseTurns: 0,
      });
    }, []);
}

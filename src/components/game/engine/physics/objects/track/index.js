import { flatten } from 'lodash';
import createStraightSegment from './straight';
import { TRACK_SEGMENT_STRAIGHT } from '../../..';


export default function createTrack(trackData) {
  return flatten(trackData.map((segmentType, index) => {
    const offsetY = index * 230;

    switch (segmentType) {
      case TRACK_SEGMENT_STRAIGHT:
        return createStraightSegment(offsetY);
      default:
        return [];
    }
  }));
}

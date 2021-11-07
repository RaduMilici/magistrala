import { Geometry } from '../../geometry/Geometry';
import { PositionLocations } from '../locations/PositionLocations';

export type buffersConfig = {
  context: WebGL2RenderingContext;
  geometry: Geometry;
  positionLocations: PositionLocations;
};

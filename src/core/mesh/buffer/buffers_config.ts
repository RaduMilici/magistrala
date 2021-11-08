import { Geometry } from '../../geometry/Geometry';
import { TransformLocations } from '../locations/TransformLocations';

export type buffersConfig = {
  context: WebGL2RenderingContext;
  geometry: Geometry;
  positionLocations: TransformLocations;
};

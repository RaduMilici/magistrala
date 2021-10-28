import { Locations } from '../Locations';
import { Geometry } from '../../geometry/Geometry';

export type bufferConfig = {
  context: WebGL2RenderingContext;
  locations: Locations;
};

export type positionBufferConfig = {
  geometry: Geometry;
} & bufferConfig;

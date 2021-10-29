import { ColorLocations } from '../locations/ColorLocations';
import { Locations } from '../locations/Locations';
import { PositionLocations } from '../locations/PositionLocations';

export type bufferConfig = {
  context: WebGL2RenderingContext;
  locations: Locations;
};

export type positionBufferConfig = {
  locations: PositionLocations;
  vertexCoordinates: Float32Array;
} & Omit<bufferConfig, 'locations'>;

export type colorBufferConfig = {
  locations: ColorLocations;
  triangleColors: Float32Array;
} & Omit<bufferConfig, 'locations'>;

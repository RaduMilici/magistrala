import { ColorLocations } from '../locations/ColorLocations';
import { Locations } from '../locations/Locations';
import { NormalLocations } from '../locations/NormalLocations';
import { TextureCoordLocations } from '../locations/TextureCoordLocations';
import { TransformLocations } from '../locations/TransformLocations';

export type bufferConfig = {
  context: WebGL2RenderingContext;
  locations: Locations;
};

export type positionBufferConfig = {
  locations: TransformLocations;
  positionCoordinates: Float32Array;
} & Omit<bufferConfig, 'locations'>;

export type colorBufferConfig = {
  locations: ColorLocations;
  color: Float32Array;
} & Omit<bufferConfig, 'locations'>;

export type textureCoordBufferConfig = {
  locations: TextureCoordLocations;
  textureCoordinates: Float32Array;
} & Omit<bufferConfig, 'locations'>;

export type normalBufferConfig = {
  locations: NormalLocations;
  normalCoordinates: Float32Array;
} & Omit<bufferConfig, 'locations'>;

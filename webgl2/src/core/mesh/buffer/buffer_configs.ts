import { ColorLocations } from '../locations/ColorLocations';
import { Locations } from '../locations/Locations';
import { NormalLocations } from '../locations/NormalLocations';
import { PositionLocations } from '../locations/PositionLocations';
import { TextureCoordLocations } from '../locations/TextureCoordLocations';

export type bufferConfig = {
    context: WebGL2RenderingContext;
    locations: Locations;
};

export type positionBufferConfig = {
    locations: PositionLocations;
    positionCoordinates: Float32Array;
} & Omit<bufferConfig, 'locations'>;

export type colorBufferConfig = {
    locations: ColorLocations;
    triangleColors: Float32Array;
} & Omit<bufferConfig, 'locations'>;

export type textureCoordBufferConfig = {
    locations: TextureCoordLocations;
    textureCoordinates: Float32Array;
} & Omit<bufferConfig, 'locations'>;

export type normalBufferConfig = {
    locations: NormalLocations;
    normalCoordinates: Float32Array;
} & Omit<bufferConfig, 'locations'>;

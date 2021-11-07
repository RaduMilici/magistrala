import { ColorLocations } from '../locations/ColorLocations';
import { Buffer } from './Buffer';
import { colorBufferConfig } from './buffer_configs';

export class TriangleColorBuffer extends Buffer {
  color: Float32Array;
  locations: ColorLocations;

  constructor({ context, locations, color }: colorBufferConfig) {
    super({ context, locations });
    this.color = color;
    this.locations = locations;
    this.context.uniform4fv(locations.colorAttributeLocation, color);
  }
}

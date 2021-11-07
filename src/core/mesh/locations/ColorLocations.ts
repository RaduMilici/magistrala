import { UniformNames } from '../location_names';
import { Locations } from './Locations';
import { locationsConfig } from './locations_config';

export class ColorLocations extends Locations {
  colorAttributeLocation: WebGLUniformLocation;

  constructor({ context, program }: locationsConfig) {
    super({ context, program });
    this.colorAttributeLocation = this.getUniformLocation(UniformNames.COLOR);
  }
}

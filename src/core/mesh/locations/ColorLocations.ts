import { UniformNames } from '../location_names';
import { Locations } from './Locations';
import { locationsConfig } from './locations_config';

export class ColorLocations extends Locations {
  colorUniformLocation: WebGLUniformLocation;

  constructor({ context, program }: locationsConfig) {
    super({ context, program });
    this.colorUniformLocation = this.getUniformLocation(UniformNames.COLOR);
  }
}

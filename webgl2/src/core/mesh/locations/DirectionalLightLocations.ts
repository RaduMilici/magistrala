import { UniformNames } from '../location_names';
import { Locations } from './Locations';
import { locationsConfig } from './locations_config';

export class DirectionalLightLocations extends Locations {
  reverseLightUniformLocation: WebGLUniformLocation;

  constructor({ context, program }: locationsConfig) {
    super({ context, program });
    this.reverseLightUniformLocation = this.getUniformLocation(
      UniformNames.REVERSE_LIGHT_DIRECTION,
    );
  }
}

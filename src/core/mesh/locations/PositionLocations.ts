import { Locations } from './Locations';
import { locationsConfig } from './locations_config';
import { AttributeNames, UniformNames } from '../location_names';

export class PositionLocations extends Locations {
  matrixUniformLocation: WebGLUniformLocation;
  positionAttributeLocation: GLint;

  constructor({ context, program }: locationsConfig) {
    super({ context, program });
    this.matrixUniformLocation = this.getUniformLocation(UniformNames.MATRIX);
    this.positionAttributeLocation = this.getAttributeLocation(
      AttributeNames.POSITION
    );
  }
}

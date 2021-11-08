import { AttributeNames } from '../location_names';
import { Locations } from './Locations';
import { locationsConfig } from './locations_config';

export class TextureCoordLocations extends Locations {
  textureCoordAttributeLocation: GLint;

  constructor({ context, program }: locationsConfig) {
    super({ context, program });
    this.textureCoordAttributeLocation = this.getAttributeLocation(
      AttributeNames.TEX_COORD,
    );
  }
}

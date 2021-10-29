import { Locations } from './Locations';
import { locationsConfig } from './locations_config';
import { AttributeNames } from '../location_names';

export class ColorLocations extends Locations {
  colorAttributeLocation: GLint;

  constructor({ context, program }: locationsConfig) {
    super({ context, program });
    this.colorAttributeLocation = this.getAttributeLocation(
      AttributeNames.COLOR
    );
  }
}

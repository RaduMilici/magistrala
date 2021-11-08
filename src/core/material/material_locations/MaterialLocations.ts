import { Locations } from '../../mesh/locations/Locations';
import { locationsConfig } from '../../mesh/locations/locations_config';

export class MaterialLocations extends Locations {
  // TODO: no longer needed?
  constructor({ context, program }: locationsConfig) {
    super({ context, program });
  }
}

import { PositionLocations } from './PositionLocations';
import { meshLocationsConfig } from './mesh_locations_config';

export class MeshLocations {
  readonly positionLocations: PositionLocations;

  constructor({ context, program }: meshLocationsConfig) {
    this.positionLocations = new PositionLocations({ context, program });
  }
}

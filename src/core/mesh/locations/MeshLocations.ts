import { TransformLocations } from './TransformLocations';
import { meshLocationsConfig } from './mesh_locations_config';

export class MeshLocations {
  readonly transformLocations: TransformLocations;

  constructor({ context, program }: meshLocationsConfig) {
    this.transformLocations = new TransformLocations({ context, program });
  }
}

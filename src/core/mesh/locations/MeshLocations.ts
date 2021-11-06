import { ColorLocations } from './ColorLocations';
import { NormalLocations } from './NormalLocations';
import { PositionLocations } from './PositionLocations';
import { TextureCoordLocations } from './TextureCoordLocations';
import { meshLocationsConfig } from './mesh_locations_config';

export class MeshLocations {
  readonly positionLocations: PositionLocations;
  readonly colorLocations: ColorLocations;
  readonly textureCoordLocations: TextureCoordLocations;
  readonly normalLocations: NormalLocations;

  constructor({ context, program }: meshLocationsConfig) {
    this.positionLocations = new PositionLocations({ context, program });
    this.colorLocations = new ColorLocations({ context, program });
    this.textureCoordLocations = new TextureCoordLocations({
      context,
      program,
    });
    this.normalLocations = new NormalLocations({ context, program });
  }
}

import { ColorLocations } from '../../mesh/locations/ColorLocations';
import { Locations } from '../../mesh/locations/Locations';
import { TextureCoordLocations } from '../../mesh/locations/TextureCoordLocations';
import { locationsConfig } from '../../mesh/locations/locations_config';

export class MaterialLocations extends Locations {
  readonly colorLocations: ColorLocations;
  readonly textureCoordLocations: TextureCoordLocations;

  constructor({ context, program }: locationsConfig) {
    super({ context, program });
    this.colorLocations = new ColorLocations({ context, program });
    this.textureCoordLocations = new TextureCoordLocations({
      context,
      program,
    });
  }
}

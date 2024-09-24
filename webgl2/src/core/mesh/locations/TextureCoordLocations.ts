import { AttributeNames } from '../location_names';
import { Locations } from './Locations';
import { locationsConfig } from './locations_config';

export class TextureCoordLocations extends Locations {
    textureCoordUniformLocation: GLint;

    constructor({ context, program }: locationsConfig) {
        super({ context, program });
        this.textureCoordUniformLocation = this.getAttributeLocation(
            AttributeNames.TEXTURE_COORD,
        );
    }
}

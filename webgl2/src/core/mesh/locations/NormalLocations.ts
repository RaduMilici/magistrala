import { AttributeNames } from '../location_names';
import { Locations } from './Locations';
import { locationsConfig } from './locations_config';

export class NormalLocations extends Locations {
    normalAttributeLocation: GLint;

    constructor({ context, program }: locationsConfig) {
        super({ context, program });
        this.normalAttributeLocation = this.getAttributeLocation(
            AttributeNames.NORMAL,
        );
    }
}

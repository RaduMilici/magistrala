import { Geometry } from '../../geometry/Geometry';
import { ColorLocations } from '../locations/ColorLocations';
import { NormalLocations } from '../locations/NormalLocations';
import { PositionLocations } from '../locations/PositionLocations';
import { TextureCoordLocations } from '../locations/TextureCoordLocations';

export type buffersConfig = {
    context: WebGL2RenderingContext;
    geometry: Geometry;
    positionLocations: PositionLocations;
    colorLocations: ColorLocations;
    textureCoordLocations: TextureCoordLocations;
    normalLocations: NormalLocations;
};

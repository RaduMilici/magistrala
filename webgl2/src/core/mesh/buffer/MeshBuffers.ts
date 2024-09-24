import { NormalBuffer } from './NormalBuffer';
import { PositionBuffer } from './PositionBuffer';
import { TextureCoordBuffer } from './TextureCoordBuffer';
import { TriangleColorBuffer } from './TriangleColorBuffer';
import { buffersConfig } from './buffers_config';

export class MeshBuffers {
    private readonly positionBuffer: PositionBuffer;
    private readonly triangleColorBuffer: TriangleColorBuffer;
    private readonly textureCoordBuffer: TextureCoordBuffer;
    private readonly normalBuffer: NormalBuffer;

    constructor({
        context,
        geometry: { positionCoordinates, triangleColors, textureCoordinates, normalCoordinates },
        positionLocations,
        colorLocations,
        textureCoordLocations,
        normalLocations,
    }: buffersConfig) {
        this.positionBuffer = new PositionBuffer({
            context,
            positionCoordinates,
            locations: positionLocations,
        });
        this.triangleColorBuffer = new TriangleColorBuffer({
            context,
            triangleColors,
            locations: colorLocations,
        });
        this.textureCoordBuffer = new TextureCoordBuffer({
            context,
            textureCoordinates,
            locations: textureCoordLocations,
        });
        this.normalBuffer = new NormalBuffer({
            context,
            normalCoordinates,
            locations: normalLocations,
        });
    }
}

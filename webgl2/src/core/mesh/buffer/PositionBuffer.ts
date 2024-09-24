import { Vector3 } from '../../Vector3';
import { PositionLocations } from '../locations/PositionLocations';
import { Buffer } from './Buffer';
import { positionBufferConfig } from './buffer_configs';

export class PositionBuffer extends Buffer {
    readonly vertexCoordinates: Float32Array;
    protected locations: PositionLocations;
    private static readonly IS_NORMALIZED = false;

    constructor({ context, locations, positionCoordinates }: positionBufferConfig) {
        super({ context, locations });
        this.vertexCoordinates = positionCoordinates;
        this.locations = locations;
        this.setBufferData();
        this.enableAttributes();
    }

    public enableAttributes() {
        this.context.enableVertexAttribArray(this.locations.positionAttributeLocation);

        this.context.vertexAttribPointer(
            this.locations.positionAttributeLocation,
            Vector3.ELEMENT_COUNT,
            WebGL2RenderingContext.FLOAT,
            PositionBuffer.IS_NORMALIZED,
            Buffer.STRIDE,
            Buffer.OFFSET,
        );
    }

    protected setBufferData() {
        this.context.bufferData(
            WebGL2RenderingContext.ARRAY_BUFFER,
            this.vertexCoordinates,
            WebGL2RenderingContext.STATIC_DRAW,
        );
    }
}

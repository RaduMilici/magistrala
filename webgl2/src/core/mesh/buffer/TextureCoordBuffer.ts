import { TextureCoordLocations } from '../locations/TextureCoordLocations';
import { Buffer } from './Buffer';
import { textureCoordBufferConfig } from './buffer_configs';

export class TextureCoordBuffer extends Buffer {
    readonly textureCoordinates: Float32Array;
    protected locations: TextureCoordLocations;
    private static readonly IS_NORMALIZED = true;

    constructor({
        context,
        locations,
        textureCoordinates,
    }: textureCoordBufferConfig) {
        super({ context, locations });
        this.textureCoordinates = textureCoordinates;
        this.locations = locations;
        this.setBufferData();
        this.enableAttributes();
    }

    public enableAttributes() {
        this.context.enableVertexAttribArray(
            this.locations.textureCoordUniformLocation,
        );

        this.context.vertexAttribPointer(
            this.locations.textureCoordUniformLocation,
            // TODO: add VECTOR2.ELEMENT_COUNT to pulsar
            2,
            WebGL2RenderingContext.FLOAT,
            TextureCoordBuffer.IS_NORMALIZED,
            Buffer.STRIDE,
            Buffer.OFFSET,
        );
    }

    protected setBufferData() {
        this.context.bufferData(
            WebGL2RenderingContext.ARRAY_BUFFER,
            this.textureCoordinates,
            WebGL2RenderingContext.STATIC_DRAW,
        );
    }
}

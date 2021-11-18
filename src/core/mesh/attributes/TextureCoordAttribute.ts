import { Buffer } from '../buffer/Buffer';
import { textureCoordBufferConfig } from '../buffer/buffer_configs';
import { TextureCoordLocations } from '../locations/TextureCoordLocations';

export class TextureCoordAttribute extends Buffer {
  public textureCoordinates: Float32Array;
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

  protected enableAttributes() {
    this.context.enableVertexAttribArray(
      this.locations.textureCoordAttributeLocation,
    );

    this.context.vertexAttribPointer(
      this.locations.textureCoordAttributeLocation,
      // TODO: add VECTOR2.ELEMENT_COUNT to pulsar
      2,
      WebGL2RenderingContext.FLOAT,
      TextureCoordAttribute.IS_NORMALIZED,
      Buffer.STRIDE,
      Buffer.OFFSET,
    );
  }

  public setBufferData() {
    this.context.bufferData(
      WebGL2RenderingContext.ARRAY_BUFFER,
      this.textureCoordinates,
      WebGL2RenderingContext.STATIC_DRAW,
    );
  }
}

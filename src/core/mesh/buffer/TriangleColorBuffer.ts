import { Color } from '../../color/Color';
import { ColorLocations } from '../locations/ColorLocations';
import { Buffer } from './Buffer';
import { colorBufferConfig } from './buffer_configs';

export class TriangleColorBuffer extends Buffer {
  triangleColors: Float32Array;
  locations: ColorLocations;

  constructor({ context, locations, triangleColors }: colorBufferConfig) {
    super({ context, locations });
    this.triangleColors = triangleColors;
    this.locations = locations;
    this.setBufferData();
    this.enableAttributes();
  }

  public enableAttributes() {
    this.context.enableVertexAttribArray(this.locations.colorAttributeLocation);

    this.context.vertexAttribPointer(
      this.locations.colorAttributeLocation,
      Color.VALUE_COUNT,
      WebGL2RenderingContext.FLOAT,
      Buffer.IS_NORMALIZED,
      Buffer.STRIDE,
      Buffer.OFFSET,
    );
  }

  protected setBufferData() {
    this.context.bufferData(
      WebGL2RenderingContext.ARRAY_BUFFER,
      this.triangleColors,
      WebGL2RenderingContext.STATIC_DRAW,
    );
  }
}

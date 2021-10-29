import { Triangle } from '../../triangle/Triangle';
import { PositionLocations } from '../locations/PositionLocations';
import { Buffer } from './Buffer';
import { positionBufferConfig } from './buffer_configs';

export class PositionBuffer extends Buffer {
  readonly vertexCoordinates: Float32Array;
  protected locations: PositionLocations;

  constructor({ context, locations, vertexCoordinates }: positionBufferConfig) {
    super({ context, locations });
    this.vertexCoordinates = vertexCoordinates;
    this.locations = locations;
    this.setBufferData();
    this.enableAttributes();
  }

  public enableAttributes() {
    this.context.enableVertexAttribArray(
      this.locations.positionAttributeLocation,
    );

    this.context.vertexAttribPointer(
      this.locations.positionAttributeLocation,
      Triangle.VERTEX_COUNT,
      WebGL2RenderingContext.FLOAT,
      Buffer.IS_NORMALIZED,
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

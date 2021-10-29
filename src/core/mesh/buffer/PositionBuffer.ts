import { Buffer } from './Buffer';
import { positionBufferConfig } from './buffer_configs';
import { PositionLocations } from '../locations/PositionLocations';

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
      this.locations.positionAttributeLocation
    );

    this.context.vertexAttribPointer(
      this.locations.positionAttributeLocation,
      3,
      WebGL2RenderingContext.FLOAT,
      false,
      0,
      0
    );
  }

  protected setBufferData() {
    this.context.bufferData(
      WebGL2RenderingContext.ARRAY_BUFFER,
      this.vertexCoordinates,
      WebGL2RenderingContext.STATIC_DRAW
    );
  }
}

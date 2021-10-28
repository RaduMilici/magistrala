import { Buffer } from './Buffer';
import { Geometry } from '../../geometry/Geometry';
import { positionBufferConfig } from './buffer_configs';

export class PositionBuffer extends Buffer {
  readonly geometry: Geometry;

  constructor({ context, locations, geometry }: positionBufferConfig) {
    super({ context, locations });
    this.geometry = geometry;
    context.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, this.glBuffer);
    this.setBufferData();
    this.enableAttributes();
  }

  protected setBufferData() {
    this.context.bufferData(
      WebGL2RenderingContext.ARRAY_BUFFER,
      this.geometry.vertexCoordinates,
      WebGL2RenderingContext.STATIC_DRAW
    );
  }

  enableAttributes() {
    this.context.enableVertexAttribArray(
      this.locations.attributeLocations.position
    );

    this.context.vertexAttribPointer(
      this.locations.attributeLocations.position,
      3,
      WebGL2RenderingContext.FLOAT,
      false,
      0,
      0
    );
  }
}

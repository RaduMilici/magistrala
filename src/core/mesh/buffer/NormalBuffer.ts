import { Vector3 } from '../../Vector3';
import { NormalLocations } from '../locations/NormalLocations';
import { Buffer } from './Buffer';
import { normalBufferConfig } from './buffer_configs';

export class NormalBuffer extends Buffer {
  readonly normals: Float32Array;
  protected locations: NormalLocations;
  private static readonly IS_NORMALIZED = false;

  constructor({ context, locations, normals }: normalBufferConfig) {
    super({ context, locations });
    this.normals = normals;
    this.locations = locations;
    this.setBufferData();
    this.enableAttributes();
  }

  public enableAttributes() {
    this.context.enableVertexAttribArray(
      this.locations.normalAttributeLocation,
    );

    this.context.vertexAttribPointer(
      this.locations.normalAttributeLocation,
      Vector3.ELEMENT_COUNT,
      WebGL2RenderingContext.FLOAT,
      NormalBuffer.IS_NORMALIZED,
      Buffer.STRIDE,
      Buffer.OFFSET,
    );
  }

  protected setBufferData() {
    this.context.bufferData(
      WebGL2RenderingContext.ARRAY_BUFFER,
      this.normals,
      WebGL2RenderingContext.STATIC_DRAW,
    );
  }
}

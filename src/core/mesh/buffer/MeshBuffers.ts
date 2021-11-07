import { PositionBuffer } from './PositionBuffer';
import { buffersConfig } from './buffers_config';

export class MeshBuffers {
  private readonly positionBuffer: PositionBuffer;

  constructor({
    context,
    geometry: { positionCoordinates },
    positionLocations,
  }: buffersConfig) {
    this.positionBuffer = new PositionBuffer({
      context,
      positionCoordinates,
      locations: positionLocations,
    });
  }
}

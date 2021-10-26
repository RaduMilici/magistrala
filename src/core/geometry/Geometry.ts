import { geometryConfig } from './geometry_config';
import { Triangle } from '../Triangle';

export class Geometry {
  public readonly vertexCoordinates: Float32Array;

  constructor(config: geometryConfig) {
    this.vertexCoordinates = Geometry.getVertexCoordinates(config.triangles);
  }

  private static getVertexCoordinates(
    triangles: Array<Triangle>
  ): Float32Array {
    const coordinates = Triangle.getPoints(triangles)
      .map(({ x, y }) => [x, y])
      .flat();
    return new Float32Array(coordinates);
  }
}

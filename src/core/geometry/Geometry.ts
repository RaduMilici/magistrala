import { geometryConfig } from './geometry_config';
import { Triangle } from '../triangle/Triangle';

export class Geometry {
  public readonly triangles: Array<Triangle>;
  public readonly vertexCoordinates: Float32Array;

  constructor({ triangles }: geometryConfig) {
    this.triangles = triangles;
    this.vertexCoordinates = Geometry.getVertexCoordinates(triangles);
  }

  private static getVertexCoordinates(
    triangles: Array<Triangle>
  ): Float32Array {
    const coordinates = Triangle.getPoints(triangles)
      .map(({ x, y, z }) => [x, y, z])
      .flat();
    return new Float32Array(coordinates);
  }
}

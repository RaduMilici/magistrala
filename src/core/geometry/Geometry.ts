import { geometryConfig } from './geometry_config';
import { Triangle } from '../triangle/Triangle';

export class Geometry {
  public readonly hasTriangleColors: boolean;
  public readonly triangles: Array<Triangle>;
  public readonly vertexCoordinates: Float32Array;

  constructor({ triangles }: geometryConfig) {
    this.triangles = triangles;
    this.vertexCoordinates = Geometry.getVertexCoordinates(triangles);
    this.hasTriangleColors = this.getHasTriangleColors();
  }

  // TODO: find out both this and getVertexCoordinates in one loop
  private getHasTriangleColors(): boolean {
    return this.triangles.findIndex((triangle) => triangle.color) !== -1;
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

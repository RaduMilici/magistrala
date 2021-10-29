import { geometryConfig } from './geometry_config';
import { Triangle } from '../triangle/Triangle';

export class Geometry {
  public readonly triangleColors: Float32Array;
  public readonly triangles: Array<Triangle>;
  public readonly vertexCoordinates: Float32Array;

  constructor({ triangles }: geometryConfig) {
    this.triangles = triangles;
    this.vertexCoordinates = Geometry.getVertexCoordinates(triangles);
    this.triangleColors = this.geTriangleColors();
  }

  get hasTriangleColors(): boolean {
    return this.triangleColors.length > 0;
  }

  private geTriangleColors(): Float32Array {
    const values = this.triangles.reduce((array, { color }) => {
      if (color) {
        array.push(...color.values, ...color.values, ...color.values);
      }
      return array;
    }, [] as Array<number>);
    return new Float32Array(values);
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

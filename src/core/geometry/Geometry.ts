import { geometryConfig } from './geometry_config';
import { Vector2 } from '../Vector2';
import { Triangle } from '../Triangle';

export class Geometry {
  public readonly vertexCoordinates: Float32Array;

  constructor(config: geometryConfig) {
    this.vertexCoordinates = Geometry.getVertexCoordinates(config.triangles);
  }

  private static getVertexCoordinates(
    triangles: Array<Triangle>
  ): Float32Array {
    const points = Triangle.getPoints(triangles);
    const coordinates = Vector2.getCoordinates(points);
    return new Float32Array(coordinates);
  }
}

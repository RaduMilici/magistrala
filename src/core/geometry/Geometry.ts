import { geometryConfig } from './geometry_config';
import { Vector } from 'pulsar-pathfinding';
import { Triangle } from '../Triangle';

export class Geometry {
  public readonly vertexCoordinates: Float32Array;

  constructor(config: geometryConfig) {
    this.vertexCoordinates = Geometry.getVertexCoordinates(config.triangles);
  }

  public static getCoordinates(vectors: Array<Vector>): number[] {
    return vectors.map((vector) => [vector.x, vector.y]).flat();
  }

  private static getVertexCoordinates(
    triangles: Array<Triangle>
  ): Float32Array {
    const points = Triangle.getPoints(triangles);
    const coordinates = Geometry.getCoordinates(points);
    return new Float32Array(coordinates);
  }
}

import { Vector } from 'pulsar-pathfinding';

import { Triangle } from '../triangle/Triangle';
import { geometryConfig } from './geometry_config';

export class Geometry {
  public readonly triangleColors: Float32Array;
  public readonly triangles: Array<Triangle>;
  public readonly positionCoordinates: Float32Array;
  public readonly textureCoordinates: Float32Array;

  constructor({ triangles }: geometryConfig) {
    this.triangles = triangles;
    const { positionCoordinates, textureCoordinates } =
      Geometry.getVertexCoordinates(triangles);
    this.positionCoordinates = positionCoordinates;
    this.textureCoordinates = textureCoordinates;
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

  private static getVertexCoordinates(triangles: Array<Triangle>): {
    positionCoordinates: Float32Array;
    textureCoordinates: Float32Array;
  } {
    const points = Triangle.getPoints(triangles);
    const positionCoordinates = [];
    const textureCoordinates = [];

    for (let i = 0; i < points.length; i++) {
      const {
        x,
        y,
        z,
        // TODO: remove default value when dynamic shaders are implemented
        textureCoord: { x: tx, y: ty } = new Vector(),
      } = points[i];
      positionCoordinates.push(x, y, z);
      textureCoordinates.push(tx, ty);
    }

    return {
      positionCoordinates: new Float32Array(positionCoordinates),
      textureCoordinates: new Float32Array(textureCoordinates),
    };
  }
}

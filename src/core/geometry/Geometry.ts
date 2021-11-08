import { Triangle } from '../triangle/Triangle';
import { geometryConfig } from './geometry_config';

export class Geometry {
  public readonly triangleColors: Float32Array;
  public readonly triangles: Array<Triangle>;
  public readonly positionCoordinates: Float32Array;
  public readonly textureCoordinates: Float32Array | null = null;
  public readonly normalCoordinates: Float32Array | null = null;
  public readonly vertCount: number;

  constructor({ triangles }: geometryConfig) {
    this.triangles = triangles;
    const { positionCoordinates, textureCoordinates, normalCoordinates } =
      Geometry.getVertexCoordinates(triangles);
    this.positionCoordinates = positionCoordinates;
    this.textureCoordinates = textureCoordinates;
    this.normalCoordinates = normalCoordinates;
    this.triangleColors = this.geTriangleColors();
    this.vertCount = this.positionCoordinates.length / 3;
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
    textureCoordinates: Float32Array | null;
    normalCoordinates: Float32Array | null;
  } {
    const points = Triangle.getPoints(triangles);
    const positionCoordinates = [];
    const textureCoordinates: Array<number> = [];
    const normalCoordinates: Array<number> = [];

    for (let i = 0; i < points.length; i++) {
      const { x, y, z, textureCoord, normal } = points[i];
      positionCoordinates.push(x, y, z);
      if (textureCoord !== null) {
        textureCoordinates.push(textureCoord.x, textureCoord.y);
      }
      if (normal !== null) {
        normalCoordinates.push(normal.x, normal.y, normal.z);
      }
    }

    return {
      positionCoordinates: new Float32Array(positionCoordinates),
      textureCoordinates: textureCoordinates.length
        ? new Float32Array(textureCoordinates)
        : null,
      normalCoordinates: normalCoordinates.length
        ? new Float32Array(normalCoordinates)
        : null,
    };
  }
}

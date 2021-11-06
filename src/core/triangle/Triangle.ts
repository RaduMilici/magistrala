import { randomFloat } from 'pulsar-pathfinding';

import { Vector3 } from '../Vector3';
import { Color } from '../color/Color';
import { triangle_config } from './triangle_config';

export class Triangle {
  public static readonly VERTEX_COUNT = 3;
  public color: Color = new Color({ r: 1, g: 1, b: 1, a: 1 });
  public readonly a: Vector3;
  public readonly b: Vector3;
  public readonly c: Vector3;

  constructor({ a, b, c, color }: triangle_config) {
    this.a = a;
    this.b = b;
    this.c = c;
    if (color !== undefined) {
      this.color = color;
    }
  }

  get points(): Array<Vector3> {
    return [this.a, this.b, this.c];
  }

  public static getPoints(triangles: Array<Triangle>): Array<Vector3> {
    return triangles.map((triangle) => triangle.points).flat();
  }

  public static fromCoordinates(coordinates: Array<number>): Triangle {
    return new Triangle({
      a: new Vector3({
        x: coordinates[0],
        y: coordinates[1],
        z: coordinates[2],
      }),
      b: new Vector3({
        x: coordinates[3],
        y: coordinates[4],
        z: coordinates[5],
      }),
      c: new Vector3({
        x: coordinates[6],
        y: coordinates[7],
        z: coordinates[8],
      }),
    });
  }

  public static multipleFromCoordinates(
    coordinates: Array<number>,
  ): Array<Triangle> {
    const triangles: Array<Triangle> = [];
    for (let i = 0; i < coordinates.length; i += 9) {
      triangles.push(Triangle.fromCoordinates(coordinates.slice(i, i + 9)));
    }
    return triangles;
  }

  public static random(): Triangle {
    const a = new Vector3({
      x: randomFloat(-1, 1),
      y: randomFloat(-1, 1),
      z: randomFloat(-1, 1),
    });
    const b = new Vector3({
      x: randomFloat(-1, 1),
      y: randomFloat(-1, 1),
      z: randomFloat(-1, 1),
    });
    const c = new Vector3({
      x: randomFloat(-1, 1),
      y: randomFloat(-1, 1),
      z: randomFloat(-1, 1),
    });
    return new Triangle({ a, b, c });
  }

  public static randomMultiple(number: number): Array<Triangle> {
    const randomTriangles = [];
    for (let i = 0; i < number; i++) {
      randomTriangles.push(Triangle.random());
    }
    return randomTriangles;
  }
}

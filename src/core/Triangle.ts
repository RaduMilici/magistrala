import { Vector2 } from './Vector2';

export class Triangle {
  constructor(public a: Vector2, public b: Vector2, public c: Vector2) {}

  get points(): Array<Vector2> {
    return [this.a, this.b, this.c];
  }

  public static getPoints(triangles: Array<Triangle>): Array<Vector2> {
    return triangles.map((triangle) => triangle.points).flat();
  }
}

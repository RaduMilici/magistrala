import { Vector2 } from './Vector2';
import { randomFloat } from '../common/random';

export class Triangle {
  constructor(public a: Vector2, public b: Vector2, public c: Vector2) {}

  get points(): Array<Vector2> {
    return [this.a, this.b, this.c];
  }

  public static getPoints(triangles: Array<Triangle>): Array<Vector2> {
    return triangles.map((triangle) => triangle.points).flat();
  }

  public randomize() {
    const { a, b, c } = Triangle.random();
    this.a = a;
    this.b = b;
    this.c = c;
  }

  public static random(): Triangle {
    const a = new Vector2(randomFloat(-1, 1), randomFloat(-1, 1));
    const b = new Vector2(randomFloat(-1, 1), randomFloat(-1, 1));
    const c = new Vector2(randomFloat(-1, 1), randomFloat(-1, 1));
    return new Triangle(a, b, c);
  }

  public static randomMultiple(number: number): Array<Triangle> {
    const randomTriangles = [];
    for (let i = 0; i < number; i++) {
      randomTriangles.push(Triangle.random());
    }
    return randomTriangles;
  }
}

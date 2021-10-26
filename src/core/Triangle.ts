import { randomFloat, Vector } from 'pulsar-pathfinding';

export class Triangle {
  constructor(public a: Vector, public b: Vector, public c: Vector) {}

  get points(): Array<Vector> {
    return [this.a, this.b, this.c];
  }

  public static getPoints(triangles: Array<Triangle>): Array<Vector> {
    return triangles.map((triangle) => triangle.points).flat();
  }

  public randomize() {
    const { a, b, c } = Triangle.random();
    this.a = a;
    this.b = b;
    this.c = c;
  }

  public static random(): Triangle {
    const a = new Vector({ x: randomFloat(-1, 1), y: randomFloat(-1, 1) });
    const b = new Vector({ x: randomFloat(-1, 1), y: randomFloat(-1, 1) });
    const c = new Vector({ x: randomFloat(-1, 1), y: randomFloat(-1, 1) });
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

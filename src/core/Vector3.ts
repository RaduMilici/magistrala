import { Vector } from 'pulsar-pathfinding';

export class Vector3 {
  public static readonly ELEMENT_COUNT = 3;
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(
    { x = 0, y = 0, z = 0 }: { x?: number; y?: number; z?: number } = {
      x: 0,
      y: 0,
      z: 0,
    },
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone(): Vector3 {
    return new Vector3({
      x: this.x,
      y: this.y,
      z: this.z,
    });
  }
}

export class Vertex extends Vector3 {
  textureCoord: Vector = new Vector();
  normal: Vector3 = new Vector3();

  clone(): Vertex {
    const vertex = new Vertex({
      x: this.x,
      y: this.y,
      z: this.z,
    });
    vertex.textureCoord = this.textureCoord;
    vertex.normal = this.normal;
    return vertex;
  }
}

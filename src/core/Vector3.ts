import { Vector } from 'pulsar-pathfinding';

export class Vector3 {
  x: number = 0;
  y: number = 0;
  z: number = 0;
  textureCoord: Vector = new Vector();

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
    const vector3 = new Vector3({
      x: this.x,
      y: this.y,
      z: this.z,
    });
    vector3.textureCoord = this.textureCoord;
    return vector3;
  }
}

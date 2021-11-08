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

  get values(): Array<number> {
    return [this.x, this.y, this.z];
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
  get textureCoord(): Vector | null {
    return this._textureCoord;
  }

  set textureCoord(value: Vector | null) {
    this._textureCoord = value ? value : null;
  }

  get normal(): Vector3 | null {
    return this._normal;
  }

  set normal(value: Vector3 | null) {
    this._normal = value ? value : null;
  }

  private _textureCoord: Vector | null = null;
  private _normal: Vector3 | null = null;

  clone(): Vertex {
    const vertex = new Vertex({
      x: this.x,
      y: this.y,
      z: this.z,
    });
    vertex._textureCoord = this._textureCoord;
    vertex._normal = this._normal;
    return vertex;
  }
}

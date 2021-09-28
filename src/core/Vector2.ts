export class Vector2 {
  constructor(public x: number, public y: number) {}

  get values(): number[] {
    return [this.x, this.y];
  }

  public static getCoordinates(vectors: Vector2[]): number[] {
    return vectors.map((vector) => vector.values).flat();
  }
}

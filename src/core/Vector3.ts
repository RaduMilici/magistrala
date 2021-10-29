export class Vector3 {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(
    { x, y, z }: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 },
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

import { Vector } from 'pulsar-pathfinding';

export class Vector3 extends Vector {
  z: number = 0;

  constructor(
    { x, y, z }: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 },
  ) {
    super({ x, y });
    this.z = z;
  }
}

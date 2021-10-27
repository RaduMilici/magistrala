import { Triangle } from '../../core/Triangle';
import { Vector3 } from '../../core/Vector3';

export const trianglePoints = [
  new Triangle(
    new Vector3({ x: 0, y: 0, z: 0 }),
    new Vector3({ x: 400, y: 0, z: 0 }),
    new Vector3({ x: 400, y: 400, z: 0 })
  ),
];

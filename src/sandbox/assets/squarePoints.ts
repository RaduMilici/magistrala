import { Triangle } from '../../core/Triangle';
import { Vector } from 'pulsar-pathfinding';

export const squarePoints = [
  new Triangle(
    new Vector({ x: -0.5, y: -0.5 }),
    new Vector({ x: -0.5, y: 0.5 }),
    new Vector({ x: 0.5, y: 0.5 })
  ),
  new Triangle(
    new Vector({ x: 0.5, y: 0.5 }),
    new Vector({ x: 0.5, y: -0.5 }),
    new Vector({ x: -0.5, y: -0.5 })
  ),
];

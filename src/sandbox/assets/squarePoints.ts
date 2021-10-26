import { Triangle } from '../../core/Triangle';
import { Vector2 } from '../../core/Vector2';

export const squarePoints = [
  new Triangle(
    new Vector2(-0.5, -0.5),
    new Vector2(-0.5, 0.5),
    new Vector2(0.5, 0.5)
  ),
  new Triangle(
    new Vector2(0.5, 0.5),
    new Vector2(0.5, -0.5),
    new Vector2(-0.5, -0.5)
  ),
];

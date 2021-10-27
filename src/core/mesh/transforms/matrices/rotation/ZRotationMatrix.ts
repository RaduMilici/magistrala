import { Matrix4 } from 'pulsar-pathfinding';
import { sinCos } from './sin_cos';

export class ZRotationMatrix extends Matrix4 {
  constructor({ sin, cos }: sinCos) {
    // prettier-ignore
    super(
       cos, sin, 0, 0,
      -sin, cos, 0, 0,
         0,   0, 1, 0,
         0,   0, 0, 1
    );
  }
}

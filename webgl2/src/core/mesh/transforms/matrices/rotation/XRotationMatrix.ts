import { Matrix4 } from 'pulsar-pathfinding';

import { sinCos } from './sin_cos';

export class XRotationMatrix extends Matrix4 {
    constructor({ sin, cos }: sinCos) {
        // prettier-ignore
        super(
      1,    0,   0, 0,
      0,  cos, sin, 0,
      0, -sin, cos, 0,
      0,    0,   0, 1
    );
    }
}

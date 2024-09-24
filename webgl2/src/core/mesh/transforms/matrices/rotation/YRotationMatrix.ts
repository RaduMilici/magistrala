import { Matrix4 } from 'pulsar-pathfinding';

import { sinCos } from './sin_cos';

export class YRotationMatrix extends Matrix4 {
    constructor({ sin, cos }: sinCos) {
        // prettier-ignore
        super(
      cos, 0, -sin, 0,
        0, 1,    0, 0,
      sin, 0,  cos, 0,
        0, 0,    0, 1
    );
    }
}

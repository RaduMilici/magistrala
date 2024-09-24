import { Matrix4 } from 'pulsar-pathfinding';

import { Vector3 } from '../../../Vector3';

export class ScaleMatrix extends Matrix4 {
    constructor({ x, y, z }: Vector3) {
        // prettier-ignore
        super(
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    );
    }
}

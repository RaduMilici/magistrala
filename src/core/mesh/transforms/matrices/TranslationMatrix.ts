import { Matrix4 } from 'pulsar-pathfinding';

import { Vector3 } from '../../../Vector3';

export class TranslationMatrix extends Matrix4 {
  constructor({ x, y, z }: Vector3) {
    // prettier-ignore
    super(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1
    );
  }
}

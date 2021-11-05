import { Matrix4 } from 'pulsar-pathfinding';

import { perspectiveMatrixConfig } from './perspective_matrix_config';

const DEFAULT_PERSPECTIVE_MATRIX_SIZE: perspectiveMatrixConfig = {
  fov: 90,
  near: 1,
  far: 100,
  aspect: 16 / 9,
};

export class PerspectiveMatrix extends Matrix4 {
  constructor({
    fov,
    near,
    far,
    aspect,
  }: perspectiveMatrixConfig = DEFAULT_PERSPECTIVE_MATRIX_SIZE) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    const rangeInv = 1.0 / (near - far);
    // prettier-ignore
    super(
      f / aspect, 0,                         0,  0,
               0, f,                         0,  0,
               0, 0,   (near + far) * rangeInv, -1,
               0, 0, near * far * rangeInv * 2,  0
    );
  }
}

import { Matrix4 } from 'pulsar-pathfinding';

import { projectionMatrixConfig } from './projection_matrix_config';

const DEFAULT_PROJECTION_MATRIX_SIZE: projectionMatrixConfig = {
    width: 1,
    height: 1,
    depth: 1,
};

export class ProjectionMatrix extends Matrix4 {
    constructor({ width, height, depth }: projectionMatrixConfig = DEFAULT_PROJECTION_MATRIX_SIZE) {
        // prettier-ignore
        super(
      2 / width,           0,        0,  0,
              0, -2 / height,        0,  0,
              0,           0, 2 / depth, 0,
             -1,           1,         0, 1
    );
    }
}

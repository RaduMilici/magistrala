import { Matrix4 } from 'pulsar-pathfinding';

import { Object3D } from './Object3D';

export class Camera extends Object3D {
    get invertedMatrix(): Matrix4 {
        return this.transforms.translationMatrix
            .multiply(this.transforms.xRotationMatrix)
            .multiply(this.transforms.yRotationMatrix)
            .multiply(this.transforms.zRotationMatrix)
            .invert();
    }
}

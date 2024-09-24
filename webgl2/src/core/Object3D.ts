import { Vector3 } from './Vector3';
import { Transforms } from './mesh/transforms/Transforms';

export class Object3D {
    public readonly transforms: Transforms;

    constructor() {
        this.transforms = new Transforms({
            translation: new Vector3(),
            rotation: new Vector3(),
            scale: new Vector3({ x: 1, y: 1, z: 1 }),
        });
    }
}

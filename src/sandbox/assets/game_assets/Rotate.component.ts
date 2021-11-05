import { tickData } from 'pulsar-pathfinding';

import { Vector3 } from '../../../core/Vector3';
import { Component3D } from '../../../core/ecs/Component3D';

export class Rotate extends Component3D {
  constructor() {
    super({ name: 'Rotate' });
  }

  update({ elapsedTime }: tickData) {
    this.parent.mesh.transforms.rotation = new Vector3({
      x: elapsedTime,
      y: elapsedTime,
      z: elapsedTime,
    });
  }
}

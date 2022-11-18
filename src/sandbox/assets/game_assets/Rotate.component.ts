import { tickData } from 'pulsar-pathfinding';

import { Vector3 } from '../../../core/Vector3';
import { Component3D } from '../../../core/ecs/Component3D';

export class Rotate extends Component3D {
  private speed = 0.1;

  constructor() {
    super({ name: 'Rotate' });
  }

  update({ elapsedTime }: tickData) {
    const { x, y, z } = this.parent.mesh.transforms.rotation;
    this.parent.mesh.transforms.rotation = new Vector3({
      x: (x + elapsedTime) * this.speed,
      y: (y + elapsedTime) * this.speed,
      z: (z + elapsedTime) * this.speed,
    });
  }
}

import { Component, GameObject, tickData } from 'pulsar-pathfinding';

import { Camera } from '../../../core/Camera';
import { Vector3 } from '../../../core/Vector3';
import { camera } from '../../app';

export class CameraGameObject extends GameObject {
  camera: Camera = camera;
  constructor() {
    super({ name: 'camera game object' });
    this.addComponent(new Slide(this));
    this.camera.transforms.translation = new Vector3({ z: 5 });
  }
}

export class Slide extends Component {
  //private speed = 2;
  //private amplitude = 130;
  constructor(public parent: CameraGameObject) {
    super({ name: 'slide component' });
  }
  update({ elapsedTime }: tickData) {
    // this.parent.camera.transforms.rotation = new Vector3({
    //   x: 0,
    //   y: -elapsedTime / 10,
    //   z: 0,
    // });
    // this.parent.camera.transforms.translation = new Vector3({
    //   x: 0,
    //   y: Math.sin(elapsedTime * this.speed) * this.amplitude,
    //   z: -Math.sin(elapsedTime * this.speed) * 200,
    // });
  }
}

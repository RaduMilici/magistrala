import { Component, GameObject } from 'pulsar-pathfinding';
import { app } from '../../app';

export class RenderGameObject extends GameObject {
  constructor() {
    super({ name: 'render game object' });
  }
}

export class RenderLoop extends Component {
  constructor() {
    super({ name: 'render component' });
  }
  update() {
    app.renderOnce();
  }
}

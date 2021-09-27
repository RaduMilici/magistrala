import { rendererConfig } from './renderer_config';
import { Canvas } from '../Canvas';
import { Errors } from '../errors';
import { size } from '../common/size';

export class Renderer {
  readonly canvas: Canvas;

  constructor(config: rendererConfig) {
    if (config.container === null) {
      throw new Error(Errors.NULL_RENDERER_CONTAINER);
    }

    this.canvas = new Canvas(config.size);
    this.setSize(config.size);
    config.container.appendChild(this.canvas.HTMLElement);
  }

  setSize(size: size) {
    this.canvas.setSize(size);
    this.canvas.context.viewport(0, 0, size.width, size.height);
  }
}

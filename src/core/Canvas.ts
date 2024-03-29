import { size } from 'pulsar-pathfinding';

import { Errors } from './errors';

export class Canvas {
  readonly HTMLElement: HTMLCanvasElement;
  readonly context: WebGL2RenderingContext;

  constructor(size: size) {
    this.HTMLElement = document.createElement('canvas');

    const context = this.HTMLElement.getContext('webgl2');
    if (context === null) {
      throw new Error(Errors.WEBGL_2_NOT_SUPPORTED);
    }
    this.context = context;
    this.setSize(size);
  }

  public setSize({ width, height }: size) {
    this.HTMLElement.width = width;
    this.HTMLElement.height = height;
    this.HTMLElement.style.width = `${width}px`;
    this.HTMLElement.style.height = `${height}px`;
  }
}

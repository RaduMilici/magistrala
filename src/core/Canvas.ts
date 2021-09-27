import { size } from './common/size';
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

  public setSize(size: size) {
    this.HTMLElement.width = size.width;
    this.HTMLElement.height = size.height;
  }
}

import { rendererConfig } from './renderer_config';
import { Canvas } from '../Canvas';
import { Color } from '../color/Color';
import { Errors } from '../errors';
import { size } from '../../common/size';
import {
  DEFAULT_RENDERER_CONTAINER,
  DEFAULT_RENDERER_SIZE,
} from './renderer_default_values';
import { Scene } from '../scene/Scene';

export class Renderer {
  readonly canvas: Canvas;
  private size: size = DEFAULT_RENDERER_SIZE;

  constructor({
    size = DEFAULT_RENDERER_SIZE,
    container = DEFAULT_RENDERER_CONTAINER,
  }: rendererConfig) {
    if (container === null) {
      throw new Error(Errors.NULL_RENDERER_CONTAINER);
    }
    this.canvas = new Canvas(size);
    this.setSize(size);
    container.appendChild(this.canvas.HTMLElement);
  }

  get context(): WebGL2RenderingContext {
    return this.canvas.context;
  }

  setSize(size: size) {
    this.canvas.setSize(size);
    this.canvas.context.viewport(0, 0, size.width, size.height);
    this.size = size;
  }

  setClearColor({ r, g, b, a }: Color) {
    this.context.clearColor(r, g, b, a);
  }

  clear() {
    this.context.clear(
      this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT
    );
  }

  render(scene: Scene) {
    this.clear();
    scene.render(this.context);
    this.context.useProgram(null);
  }
}

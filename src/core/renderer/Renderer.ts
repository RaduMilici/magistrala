import { rendererConfig } from './renderer_config';
import { Canvas } from '../Canvas';
import { Color } from '../color/Color';
import { Errors } from '../errors';
import { size } from 'pulsar-pathfinding';
import {
  DEFAULT_RENDERER_CONTAINER,
  DEFAULT_RENDERER_SIZE,
  DEFAULT_RENDERER_DEPTH,
} from './renderer_default_values';
import { Scene } from '../scene/Scene';
import { ProjectionMatrix } from '../mesh/transforms/matrices/projection/ProjectionMatrix';

export class Renderer {
  readonly canvas: Canvas;
  readonly projectionMatrix: ProjectionMatrix;
  private size: size = DEFAULT_RENDERER_SIZE;

  constructor({
    size: { width, height } = DEFAULT_RENDERER_SIZE,
    container = DEFAULT_RENDERER_CONTAINER,
    depth = DEFAULT_RENDERER_DEPTH,
  }: rendererConfig) {
    if (container === null) {
      throw new Error(Errors.NULL_RENDERER_CONTAINER);
    }
    this.canvas = new Canvas({ width, height });
    this.setSize({ width, height });
    this.projectionMatrix = new ProjectionMatrix({ width, height, depth });
    container.appendChild(this.canvas.HTMLElement);
    this.context.enable(WebGL2RenderingContext.CULL_FACE);
    this.context.enable(WebGL2RenderingContext.DEPTH_TEST);
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
      WebGL2RenderingContext.COLOR_BUFFER_BIT |
        WebGL2RenderingContext.DEPTH_BUFFER_BIT
    );
  }

  render(scene: Scene) {
    this.clear();
    scene.render(this.context);
  }
}

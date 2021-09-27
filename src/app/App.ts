import { rendererConfig } from '../core/renderer/renderer_config';
import { Renderer } from '../core/renderer/Renderer';

export class App {
  private renderer: Renderer;

  constructor(private config: rendererConfig) {
    this.renderer = new Renderer(config);
  }
}

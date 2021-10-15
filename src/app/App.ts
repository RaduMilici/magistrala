import { Renderer } from '../core/renderer/Renderer';
import { rendererConfig } from '../core/renderer/renderer_config';
import { VertexShader } from '../core/shader/VertexShader';
import { FragmentShader } from '../core/shader/FragmentShader';
import { shaderConfig } from '../core/shader/shader_configs';
import { Geometry } from '../core/geometry/Geometry';
import { Triangle } from '../core/Triangle';
import { Vector2 } from '../core/Vector2';
import { Mesh } from '../core/mesh/Mesh';
import { meshConfig } from '../core/mesh/mesh_config';
import { Scene } from '../core/scene/Scene';

export class App {
  public readonly renderer: Renderer;
  constructor(private rendererConfig: rendererConfig) {
    this.renderer = new Renderer(rendererConfig);
  }

  createVertexShader({ source }: Omit<shaderConfig, 'context'>): VertexShader {
    return new VertexShader({ source, context: this.renderer.context });
  }

  createFragmentShader({
    source,
  }: Omit<shaderConfig, 'context'>): FragmentShader {
    return new FragmentShader({ source, context: this.renderer.context });
  }

  createMesh({
    fragmentShader,
    vertexShader,
    geometry,
  }: Omit<meshConfig, 'context'>): Mesh {
    return new Mesh({
      vertexShader,
      fragmentShader,
      geometry,
      context: this.renderer.context,
    });
  }

  render(scene: Scene) {
    this.renderer.render(scene);
  }

  Geometry = Geometry;
  Triangle = Triangle;
  Vector2 = Vector2;
  Scene = Scene;
}

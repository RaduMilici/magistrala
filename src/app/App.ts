import { Renderer } from '../core/renderer/Renderer';
import { rendererConfig } from '../core/renderer/renderer_config';
import { VertexShader } from '../core/shader/VertexShader';
import { FragmentShader } from '../core/shader/FragmentShader';
import { shaderConfig } from '../core/shader/shader_configs';
import { Geometry } from '../core/geometry/Geometry';
import { geometryConfig } from '../core/geometry/geometry_config';
import { Triangle } from '../core/Triangle';
import { Vector2 } from '../core/Vector2';
import { Mesh } from '../core/mesh/Mesh';
import { meshConfig } from '../core/mesh/mesh_config';
import { Scene } from '../core/scene/Scene';

export class App {
  public readonly scenes: Array<Scene> = [];
  public readonly renderer: Renderer;

  private requestAnimationFrameId: number = 0;

  constructor(private rendererConfig: rendererConfig) {
    this.renderer = new Renderer(rendererConfig);
  }

  newVertexShader({ source }: Omit<shaderConfig, 'context'>): VertexShader {
    return new VertexShader({ source, context: this.renderer.context });
  }

  newFragmentShader({ source }: Omit<shaderConfig, 'context'>): FragmentShader {
    return new FragmentShader({ source, context: this.renderer.context });
  }

  newMesh({
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

  newGeometry(config: geometryConfig): Geometry {
    return new Geometry(config);
  }

  newTriangle(a: Vector2, b: Vector2, c: Vector2): Triangle {
    return new Triangle(a, b, c);
  }

  newScene(): Scene {
    return new Scene();
  }

  newVector2(x: number, y: number): Vector2 {
    return new Vector2(x, y);
  }

  addScene(scene: Scene) {
    this.scenes.push(scene);
  }

  removeScene(scene: Scene) {
    const index = this.scenes.findIndex(
      (activeScene) => activeScene.id === scene.id
    );
    if (index !== -1) {
      this.scenes.splice(index, 1);
    }
  }

  renderOnce() {
    this.scenes.forEach((scene) => this.renderer.render(scene));
  }

  startRendering = () => {
    this.requestAnimationFrameId = requestAnimationFrame(this.startRendering);
    this.renderOnce();
  };

  stopRendering() {
    cancelAnimationFrame(this.requestAnimationFrameId);
  }
}

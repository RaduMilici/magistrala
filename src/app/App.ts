import { Vector3 } from '../core/Vector3';
import { Geometry } from '../core/geometry/Geometry';
import { geometryConfig } from '../core/geometry/geometry_config';
import { Mesh } from '../core/mesh/Mesh';
import { meshConfig } from '../core/mesh/mesh_config';
import { Renderer } from '../core/renderer/Renderer';
import { rendererConfig } from '../core/renderer/renderer_config';
import { Scene } from '../core/scene/Scene';
import { FragmentShader } from '../core/shader/FragmentShader';
import { VertexShader } from '../core/shader/VertexShader';
import { shaderConfig } from '../core/shader/shader_configs';
import { Triangle } from '../core/triangle/Triangle';
import { triangle_config } from '../core/triangle/triangle_config';

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
  }: Omit<meshConfig, 'context' | 'perspectiveMatrix'>): Mesh {
    return new Mesh({
      vertexShader,
      fragmentShader,
      geometry,
      context: this.renderer.context,
      perspectiveMatrix: this.renderer.perspectiveMatrix,
    });
  }

  newGeometry(config: geometryConfig): Geometry {
    return new Geometry(config);
  }

  newTriangle({ a, b, c, color }: triangle_config): Triangle {
    return new Triangle({ a, b, c, color });
  }

  newScene(): Scene {
    return new Scene();
  }

  newVector2(x: number, y: number, z: number): Vector3 {
    return new Vector3({ x, y, z });
  }

  addScene(scene: Scene) {
    this.scenes.push(scene);
  }

  removeScene(scene: Scene) {
    const index = this.scenes.findIndex(
      (activeScene) => activeScene.id === scene.id,
    );
    if (index !== -1) {
      this.scenes.splice(index, 1);
    }
  }

  renderOnce() {
    this.scenes.forEach((scene) => this.renderer.render(scene));
  }

  startRendering = () => {
    this.renderOnce();
    this.requestAnimationFrameId = requestAnimationFrame(this.startRendering);
  };

  stopRendering() {
    cancelAnimationFrame(this.requestAnimationFrameId);
  }
}

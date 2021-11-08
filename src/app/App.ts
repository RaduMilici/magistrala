import { Camera } from '../core/Camera';
import { Vector3 } from '../core/Vector3';
import { Geometry } from '../core/geometry/Geometry';
import { geometryConfig } from '../core/geometry/geometry_config';
import { DirectionalLight } from '../core/lights/directional_light/DirectionalLight';
import { BasicMaterial } from '../core/material/basic_material/BasicMaterial';
import { basicMaterialConfig } from '../core/material/basic_material/basic_material_config';
import { Mesh } from '../core/mesh/Mesh';
import { meshConfig } from '../core/mesh/mesh_config';
import { Renderer } from '../core/renderer/Renderer';
import { rendererConfig } from '../core/renderer/renderer_config';
import { Scene } from '../core/scene/Scene';
import { FragmentShader } from '../core/shader/FragmentShader';
import { VertexShader } from '../core/shader/VertexShader';
import { shaderConfig } from '../core/shader/shader_configs';
import { Texture } from '../core/texture/Texture';
import { textureConfig } from '../core/texture/texture_config';
import { Triangle } from '../core/triangle/Triangle';
import { triangle_config } from '../core/triangle/triangle_config';

export class App {
  public readonly renderer: Renderer;

  constructor(private rendererConfig: rendererConfig) {
    this.renderer = new Renderer(rendererConfig);
  }

  newVertexShader({ source }: Omit<shaderConfig, 'context'>): VertexShader {
    return new VertexShader({ source, context: this.renderer.context });
  }

  newDirectionalLight(direction: Vector3): DirectionalLight {
    return new DirectionalLight({
      context: this.renderer.context,
      direction,
    });
  }

  newFragmentShader({ source }: Omit<shaderConfig, 'context'>): FragmentShader {
    return new FragmentShader({ source, context: this.renderer.context });
  }

  newMesh({
    geometry,
    material,
  }: Omit<meshConfig, 'context' | 'perspectiveMatrix'>): Mesh {
    return new Mesh({
      geometry,
      context: this.renderer.context,
      perspectiveMatrix: this.renderer.perspectiveMatrix,
      material,
    });
  }

  newTexture({ image, src }: Omit<textureConfig, 'context'> = {}): Texture {
    return new Texture({ context: this.renderer.context, image, src });
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

  newBasicMaterial({
    color,
    texture,
  }: Omit<basicMaterialConfig, 'context'> = {}): BasicMaterial {
    return new BasicMaterial({
      context: this.renderer.context,
      color,
      texture,
    });
  }

  render(scene: Scene, camera: Camera) {
    this.renderer.render(scene, camera);
  }
}

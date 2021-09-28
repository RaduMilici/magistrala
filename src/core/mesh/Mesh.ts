import { Geometry } from '../geometry/Geometry';
import { VertexShader } from '../shader/VertexShader';
import { FragmentShader } from '../shader/FragmentShader';
import { meshConfig } from './mesh_config';

export class Mesh {
  private readonly buffer: WebGLBuffer;
  constructor(config: meshConfig) {
    const { vertexShader, fragmentShader } = Mesh.createShaders(
      config.context,
      config.vertexShaderSource,
      config.fragmentShaderSource
    );
    this.buffer = config.context.createBuffer();
  }

  private static createShaders(
    context: WebGL2RenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ): { vertexShader: VertexShader; fragmentShader: FragmentShader } {
    const vertexShader = new VertexShader({
      context,
      source: vertexShaderSource,
    });
    const fragmentShader = new FragmentShader({
      context,
      source: fragmentShaderSource,
    });
    return { vertexShader, fragmentShader };
  }
}

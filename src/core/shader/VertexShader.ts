import { Shader } from './Shader';
import { shaderConfig } from './shader_configs';

export class VertexShader extends Shader {
  constructor({ context, source }: shaderConfig) {
    super({
      context,
      source,
      type: WebGL2RenderingContext.VERTEX_SHADER,
    });
  }
}

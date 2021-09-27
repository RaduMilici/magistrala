import { shaderConfig } from './shader_configs';
import { Shader } from './Shader';

export class VertexShader extends Shader {
  constructor({ context, source }: shaderConfig) {
    super({
      context,
      source,
      type: context.VERTEX_SHADER,
    });
  }
}

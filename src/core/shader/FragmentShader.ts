import { Shader } from './Shader';
import { shaderConfig } from './shader_configs';

export class FragmentShader extends Shader {
  constructor({ context, source }: shaderConfig) {
    super({
      context,
      source,
      type: WebGL2RenderingContext.FRAGMENT_SHADER,
    });
  }
}

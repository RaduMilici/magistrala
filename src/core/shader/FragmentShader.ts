import { shaderConfig } from './shader_configs';
import { Shader } from './Shader';

export class FragmentShader extends Shader {
  constructor({ context, source }: shaderConfig) {
    super({
      context,
      source,
      type: WebGL2RenderingContext.FRAGMENT_SHADER,
    });
  }
}

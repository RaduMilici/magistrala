import { UniformNames, VaryingNames } from '../../../mesh/location_names';
import { DynamicFragmentShaderSource } from '../../../shader/dynamic_shader/DynamicFragmentShaderSource';
import {
  Uniforms,
  Varyings,
} from '../../../shader/dynamic_shader/chunks/variables';
import {
  BasicMaterialState,
  BasicMaterialStates,
} from './basic_material_state';

export class BasicMaterialFragmentShaderSource extends DynamicFragmentShaderSource {
  constructor({ value }: BasicMaterialState) {
    super();

    switch (value) {
      case BasicMaterialStates.COLOR_ONLY:
        this.addUniform(Uniforms.COLOR);
        this.addToMain(
          `${DynamicFragmentShaderSource.OUT_COLOR_NAME} = ${UniformNames.COLOR};`,
        );
        break;
      case BasicMaterialStates.TEXTURE_ONLY:
        this.addTextureFields();
        this.addToMain(
          `${DynamicFragmentShaderSource.OUT_COLOR_NAME} = texture(${UniformNames.TEXTURE}, ${VaryingNames.TEX_COORD});`,
        );
        break;
      case BasicMaterialStates.COLOR_AND_TEXTURE:
        this.addUniform(Uniforms.COLOR);
        this.addTextureFields();
        this.addToMain(
          `${DynamicFragmentShaderSource.OUT_COLOR_NAME} = texture(${UniformNames.TEXTURE}, ${VaryingNames.TEX_COORD}) + ${UniformNames.COLOR};`,
        );
    }
  }

  addTextureFields() {
    this.addVarying(Varyings.TEX_COORD);
    this.addUniform(Uniforms.TEXTURE);
  }
}

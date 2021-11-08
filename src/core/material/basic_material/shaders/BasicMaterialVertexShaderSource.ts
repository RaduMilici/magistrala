import { AttributeNames, VaryingNames } from '../../../mesh/location_names';
import { DynamicVertexShaderSource } from '../../../shader/dynamic_shader/DynamicVertexShaderSource';
import {
  Attributes,
  Uniforms,
  Varyings,
} from '../../../shader/dynamic_shader/chunks/variables';
import {
  BasicMaterialState,
  BasicMaterialStates,
} from './basic_material_state';

export class BasicMaterialVertexShaderSource extends DynamicVertexShaderSource {
  constructor({ value }: BasicMaterialState) {
    super();
    this.addAttribute(Attributes.POSITION);
    this.addUniform(Uniforms.TRANSLATION_MATRIX);
    switch (value) {
      case BasicMaterialStates.TEXTURE_ONLY:
        this.setUpTextureFields();
        this.addToMain(
          `${VaryingNames.TEX_COORD} = ${AttributeNames.TEX_COORD};`,
        );
        break;
      case BasicMaterialStates.COLOR_AND_TEXTURE:
        this.setUpTextureFields();
        this.addToMain(
          `${VaryingNames.TEX_COORD} = ${AttributeNames.TEX_COORD};`,
        );
    }
  }

  private setUpTextureFields() {
    this.addAttribute(Attributes.TEX_COORD);
    this.addVarying(Varyings.TEX_COORD);
  }
}

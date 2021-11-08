import { UniformNames, VaryingNames } from '../../../mesh/location_names';
import { DynamicVertexShaderSource } from '../../../shader/dynamic_shader/DynamicVertexShaderSource';
import {
  Attributes,
  Uniforms,
  Varyings,
} from '../../../shader/dynamic_shader/chunks/variables';

export class BasicMaterialVertexShaderSource extends DynamicVertexShaderSource {
  constructor() {
    super();
    this.addAttribute(Attributes.POSITION);
    this.addUniform(Uniforms.COLOR);
    this.addUniform(Uniforms.TRANSLATION_MATRIX);
    this.addVarying(Varyings.COLOR);
    this.addToMain(`${VaryingNames.COLOR} = ${UniformNames.COLOR};`);
  }
}

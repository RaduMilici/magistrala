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
    this.addAttribute(Attributes.position);
    this.addUniform(Uniforms.color);
    this.addUniform(Uniforms.translationMatrix);
    this.addVarying(Varyings.color);
    this.addToMain(`${VaryingNames.COLOR} = ${UniformNames.COLOR};`);
  }
}

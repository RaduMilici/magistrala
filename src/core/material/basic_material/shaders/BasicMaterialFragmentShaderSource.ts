import { VaryingNames } from '../../../mesh/location_names';
import { DynamicFragmentShaderSource } from '../../../shader/dynamic_shader/DynamicFragmentShaderSource';
import { Varyings } from '../../../shader/dynamic_shader/chunks/variables';

export class BasicMaterialFragmentShaderSource extends DynamicFragmentShaderSource {
  constructor() {
    super();
    this.addVarying(Varyings.COLOR);
    this.addToMain(
      `${DynamicFragmentShaderSource.OUT_COLOR_NAME} = ${VaryingNames.COLOR};`,
    );
  }
}

import { Errors } from '../../errors';
import { DynamicShaderSource } from './DynamicShaderSource';

export class DynamicFragmentShaderSource extends DynamicShaderSource {
  public static readonly OUT_COLOR_NAME = 'out_color';
  public static readonly OUT_COLOR = `out vec4 ${DynamicFragmentShaderSource.OUT_COLOR_NAME};`;
  private static readonly PRECISION = 'precision mediump float;';

  constructor() {
    super();
    this.headers.push(DynamicFragmentShaderSource.PRECISION);
    this.headers.push(DynamicFragmentShaderSource.OUT_COLOR);
  }

  addAttribute(attribute: string) {
    throw new Error(Errors.CAN_NOT_ADD_ATTRIBUTE_TO_FRAGMENT_SHADER);
  }

  addVarying(varying: string) {
    super.addVarying(`in ${varying};`);
  }
}

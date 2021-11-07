import { AttributeNames, UniformNames } from '../../mesh/location_names';
import { DynamicShaderSource } from './DynamicShaderSource';

export class DynamicVertexShaderSource extends DynamicShaderSource {
  private static readonly GL_POSITION = `gl_Position = ${UniformNames.MATRIX} * ${AttributeNames.POSITION};`;

  protected get main(): string {
    const body = [
      ...this.mainLines,
      DynamicVertexShaderSource.GL_POSITION,
    ].join('\n');
    return `void main() {\n${body}\n}`;
  }

  addAttribute(attribute: string) {
    super.addAttribute(`in ${attribute};`);
  }

  addVarying(varying: string) {
    super.addVarying(`out ${varying};`);
  }
}

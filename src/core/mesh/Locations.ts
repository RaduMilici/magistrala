import { UniformNames, AttributeNames } from './location_names';
import { Errors } from '../errors';
import { uniformLocations, attributeLocations } from './locations_types';
import { Program } from '../program/Program';

export class Locations {
  readonly uniformLocations: uniformLocations;
  readonly attributeLocations: attributeLocations;

  constructor(
    private readonly context: WebGL2RenderingContext,
    private readonly program: Program
  ) {
    this.uniformLocations = this.getUniformLocations();
    this.attributeLocations = this.getAttributeLocations();
  }

  private getUniformLocations(): uniformLocations {
    const pointSize = this.getUniformLocation(UniformNames.POINT_SIZE);
    const translation = this.getUniformLocation(UniformNames.TRANSLATION);
    const scale = this.getUniformLocation(UniformNames.SCALE);
    const rotation = this.getUniformLocation(UniformNames.ROTATION);

    return { pointSize, translation, scale, rotation };
  }

  private getUniformLocation(name: string): WebGLUniformLocation {
    const location = this.context.getUniformLocation(
      this.program.glProgram,
      name
    );

    if (location === null) {
      throw new Error(`${Errors.COULD_NOT_GET_UNIFORM_LOCATION} - ${name}`);
    }

    return location;
  }

  private getAttributeLocations(): attributeLocations {
    const position = this.getAttributeLocation(AttributeNames.POSITION);
    const vertColor = this.getAttributeLocation(AttributeNames.VERTEX_COLOR);

    return { position, vertColor };
  }

  private getAttributeLocation(name: string): GLint {
    const location = this.context.getAttribLocation(
      this.program.glProgram,
      name
    );

    if (location === -1) {
      throw new Error(`${Errors.COULD_NOT_GET_ATTRIBUTE_LOCATION} - ${name}`);
    }

    return location;
  }
}

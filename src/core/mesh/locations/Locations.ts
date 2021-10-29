import { Errors } from '../../errors';
import { Program } from '../../program/Program';
import { locationsConfig } from './locations_config';

export abstract class Locations {
  private readonly context: WebGL2RenderingContext;
  private readonly program: Program;

  protected constructor({ context, program }: locationsConfig) {
    this.context = context;
    this.program = program;
  }

  protected getUniformLocation(name: string): WebGLUniformLocation {
    const location = this.context.getUniformLocation(
      this.program.glProgram,
      name
    );

    if (location === null) {
      throw new Error(`${Errors.COULD_NOT_GET_UNIFORM_LOCATION} - ${name}`);
    }

    return location;
  }

  protected getAttributeLocation(name: string): GLint {
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

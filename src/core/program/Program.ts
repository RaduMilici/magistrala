import { programConfig } from './program_config';
import { Errors } from '../errors';

export class Program {
  private readonly glProgram: WebGLProgram;

  constructor(config: programConfig) {
    this.glProgram = this.createGlProgram(config);
    Program.verify(config.context, this.glProgram);

    if (config.debug) {
      Program.validate(config.context, this.glProgram);
    }
  }

  private createGlProgram(config: programConfig): WebGLProgram {
    const glProgram = config.context.createProgram();

    if (glProgram === null) {
      throw new Error(Errors.COULD_NOT_CREATE_PROGRAM);
    }

    Program.attachShaders(config, this.glProgram);
    return glProgram;
  }

  private static attachShaders(config: programConfig, program: WebGLProgram) {
    config.context.attachShader(program, config.vertexShader);
    config.context.attachShader(program, config.fragmentShader);
  }

  private static verify(
    context: WebGL2RenderingContext,
    program: WebGLProgram
  ) {
    const success = context.getProgramParameter(program, context.LINK_STATUS);

    if (!success) {
      const infoLog = context.getProgramInfoLog(program);
      context.deleteProgram(program);
      throw new Error(`${Errors.COULD_NOT_LINK_PROGRAM} - ${infoLog}`);
    }
  }

  private static validate(
    context: WebGL2RenderingContext,
    program: WebGLProgram
  ) {
    context.validateProgram(program);
    const success = context.getProgramParameter(
      program,
      context.VALIDATE_STATUS
    );

    if (!success) {
      const infoLog = context.getProgramInfoLog(program);
      context.deleteProgram(program);
      throw new Error(`${Errors.COULD_NOT_VALIDATE_PROGRAM} - ${infoLog}`);
    }
  }
}

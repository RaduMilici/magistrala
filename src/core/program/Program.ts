import { programConfig } from './program_config';
import { Errors } from '../errors';
import { VertexShader } from '../shader/VertexShader';
import { FragmentShader } from '../shader/FragmentShader';

export class Program {
  public readonly glProgram: WebGLProgram;
  private readonly context: WebGL2RenderingContext;

  constructor(config: programConfig) {
    this.context = config.context;
    this.glProgram = Program.createGlProgram(config);
    this.attachShaders(config.vertexShader, config.fragmentShader);
    this.context.linkProgram(this.glProgram);
    Program.verify(config.context, this.glProgram);

    if (config.debug) {
      Program.validate(config.context, this.glProgram);
    }
  }

  public use() {
    this.context.useProgram(this.glProgram);
  }

  private static createGlProgram(config: programConfig): WebGLProgram {
    const glProgram = config.context.createProgram();

    if (glProgram === null) {
      throw new Error(Errors.COULD_NOT_CREATE_PROGRAM);
    }

    return glProgram;
  }

  private attachShaders(
    vertexShader: VertexShader,
    fragmentShader: FragmentShader
  ) {
    this.context.attachShader(this.glProgram, vertexShader.glShader);
    this.context.attachShader(this.glProgram, fragmentShader.glShader);
  }

  private static verify(
    context: WebGL2RenderingContext,
    program: WebGLProgram
  ) {
    const success = context.getProgramParameter(
      program,
      WebGL2RenderingContext.LINK_STATUS
    );

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
      WebGL2RenderingContext.VALIDATE_STATUS
    );

    if (!success) {
      const infoLog = context.getProgramInfoLog(program);
      context.deleteProgram(program);
      throw new Error(`${Errors.COULD_NOT_VALIDATE_PROGRAM} - ${infoLog}`);
    }
  }
}

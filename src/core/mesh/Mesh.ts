import { meshConfig } from './mesh_config';
import { Errors } from '../errors';
import { Program } from '../program/Program';
import { Locations } from './Locations';

export class Mesh {
  private readonly context: WebGL2RenderingContext;
  private readonly buffer: WebGLBuffer;
  private readonly program: WebGLProgram;
  private readonly locations: Locations;

  constructor(config: meshConfig) {
    this.context = config.context;
    this.buffer = Mesh.createBuffer(this.context);
    this.program = new Program({
      context: this.context,
      vertexShader: config.vertexShader,
      fragmentShader: config.fragmentShader,
      debug: true,
    });
    this.locations = new Locations(this.context, this.program);
  }

  private static createBuffer(context: WebGL2RenderingContext): WebGLBuffer {
    const buffer = context.createBuffer();

    if (buffer === null) {
      throw new Error(Errors.COULD_NOT_CREATE_BUFFER);
    }

    return buffer;
  }
}

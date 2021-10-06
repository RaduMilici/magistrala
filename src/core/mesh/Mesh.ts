import { Geometry } from '../geometry/Geometry';
import { VertexShader } from '../shader/VertexShader';
import { FragmentShader } from '../shader/FragmentShader';
import { meshConfig } from './mesh_config';
import { Errors } from '../errors';
import { Program } from '../program/Program';
import { UniformNames } from '../shader/names';

type uniformLocations = {
  pointSize: WebGLUniformLocation;
  translation: WebGLUniformLocation;
  scale: WebGLUniformLocation;
  rotation: WebGLUniformLocation;
};

export class Mesh {
  private readonly context: WebGL2RenderingContext;
  private readonly buffer: WebGLBuffer;
  private readonly program: WebGLProgram;
  private readonly uniformLocations: uniformLocations;

  constructor(config: meshConfig) {
    this.context = config.context;
    const { vertexShader, fragmentShader } = this.createShaders(
      config.vertexShaderSource,
      config.fragmentShaderSource
    );
    this.buffer = this.createBuffer();
    this.program = new Program({
      context: this.context,
      vertexShader,
      fragmentShader,
      debug: true,
    });
    this.uniformLocations = this.getUniformLocations();
  }

  private createShaders(
    vertexShaderSource: string,
    fragmentShaderSource: string
  ): { vertexShader: VertexShader; fragmentShader: FragmentShader } {
    const vertexShader = new VertexShader({
      context: this.context,
      source: vertexShaderSource,
    });
    const fragmentShader = new FragmentShader({
      context: this.context,
      source: fragmentShaderSource,
    });
    return { vertexShader, fragmentShader };
  }

  private createBuffer(): WebGLBuffer {
    const buffer = this.context.createBuffer();

    if (buffer === null) {
      throw new Error(Errors.COULD_NOT_CREATE_BUFFER);
    }

    return buffer;
  }

  private getUniformLocations(): uniformLocations {
    const pointSize = this.getUniformLocation(UniformNames.POINT_SIZE);
    const translation = this.getUniformLocation(UniformNames.TRANSLATION);
    const scale = this.getUniformLocation(UniformNames.SCALE);
    const rotation = this.getUniformLocation(UniformNames.ROTATION);

    return { pointSize, translation, scale, rotation };
  }

  private getUniformLocation(name: string): WebGLUniformLocation {
    const location = this.context.getUniformLocation(this.program, name);

    if (location === null) {
      throw new Error(`${Errors.COULD_NOT_GET_UNIFORM_LOCATION} - ${name}`);
    }

    return location;
  }
}

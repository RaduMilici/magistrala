import { Program } from '../program/Program';
import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';
import { materialConfig, materialSourceConfig } from './material_config';

export abstract class Material {
  program: Program;
  readonly onRecompileShaders: Array<() => void> = [];
  protected context: WebGL2RenderingContext;

  protected _textureCoordinates: Float32Array | undefined;

  private vertexShader: VertexShader;
  private fragmentShader: FragmentShader;

  protected constructor({
    context,
    vertexShader,
    fragmentShader,
  }: materialConfig) {
    this.context = context;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.program = Material.buildProgram({
      context,
      vertexShader,
      fragmentShader,
    });
  }

  protected recompile({
    context,
    vertexShader,
    fragmentShader,
  }: materialConfig) {
    this.context = context;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.program = Material.buildProgram({
      context,
      vertexShader,
      fragmentShader,
    });
  }

  get textureCoordinates(): Float32Array | undefined {
    return this._textureCoordinates;
  }

  set textureCoordinates(value: Float32Array | undefined) {
    this._textureCoordinates = value;
  }

  abstract bindTexture(): void;

  protected static buildProgram({
    context,
    vertexShader,
    fragmentShader,
  }: materialConfig): Program {
    return new Program({
      context,
      vertexShader,
      fragmentShader,
      debug: true,
    });
  }

  protected static buildProgramFromSource({
    context,
    vertexShaderSource,
    fragmentShaderSource,
  }: materialSourceConfig) {
    const { fragmentShader, vertexShader } = Material.compileShadersFromSource({
      context,
      vertexShaderSource,
      fragmentShaderSource,
    });
    return Material.buildProgram({ context, vertexShader, fragmentShader });
  }

  protected static compileShadersFromSource({
    context,
    vertexShaderSource,
    fragmentShaderSource,
  }: materialSourceConfig): {
    vertexShader: VertexShader;
    fragmentShader: FragmentShader;
  } {
    const vertexShader = new VertexShader({
      context,
      source: vertexShaderSource,
    });
    const fragmentShader = new FragmentShader({
      context,
      source: fragmentShaderSource,
    });
    return { vertexShader, fragmentShader };
  }
}

import { Program } from '../program/Program';
import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';
import { materialConfig } from './material_config';

export abstract class Material {
  program: Program;
  protected readonly context: WebGL2RenderingContext;

  private _textureCoordinates: Float32Array | null = null;

  private readonly vertexShader: VertexShader;
  private readonly fragmentShader: FragmentShader;

  protected constructor({
    context,
    vertexShader,
    fragmentShader,
  }: materialConfig) {
    this.context = context;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.program = this.compileShaders({ vertexShader, fragmentShader });
  }

  get textureCoordinates(): Float32Array | null {
    return this._textureCoordinates;
  }

  set textureCoordinates(value: Float32Array | null) {
    this._textureCoordinates = value;
  }

  abstract bindTexture(): void;

  protected compileShaders({
    vertexShader,
    fragmentShader,
  }: Omit<materialConfig, 'context'>): Program {
    return new Program({
      context: this.context,
      vertexShader,
      fragmentShader,
      debug: true,
    });
  }
}

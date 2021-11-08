import { TextureCoordLocations } from '../mesh/locations/TextureCoordLocations';
import { Program } from '../program/Program';
import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';
import { materialConfig } from './material_config';
import { MaterialLocations } from './material_locations/MaterialLocations';

export abstract class Material {
  private _textureCoordinates: Float32Array | null = null;
  private _textureCoordLocations: TextureCoordLocations | null = null;

  private _program!: Program;
  private materialLocations: MaterialLocations | null = null;
  private readonly vertexShader: VertexShader;
  private readonly fragmentShader: FragmentShader;

  protected readonly context: WebGL2RenderingContext;

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

  get program(): Program {
    return this._program;
  }

  set program(value: Program) {
    this._program = value;
    this.materialLocations = new MaterialLocations({
      context: this.context,
      program: value,
    });
  }

  get textureCoordinates(): Float32Array | null {
    return this._textureCoordinates;
  }

  set textureCoordinates(value: Float32Array | null) {
    this._textureCoordinates = value;
  }

  get textureCoordLocations(): TextureCoordLocations | null {
    return this._textureCoordLocations;
  }

  set textureCoordLocations(value: TextureCoordLocations | null) {
    this._textureCoordLocations = value;
  }

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

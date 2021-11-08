import { Program } from '../program/Program';
import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';
import { materialConfig } from './material_config';
import { MaterialLocations } from './material_locations/MaterialLocations';

export abstract class Material {
  textureCoordinates: Float32Array | null = null;

  private _program: Program;
  private materialLocations: MaterialLocations | null = null;

  private readonly context: WebGL2RenderingContext;
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
    this._program = new Program({
      context,
      vertexShader,
      fragmentShader,
      debug: true,
    });
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
}

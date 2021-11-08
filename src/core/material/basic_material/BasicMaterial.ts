import { Color } from '../../color/Color';
import { ColorBuffer } from '../../mesh/buffer/ColorBuffer';
import { ColorLocations } from '../../mesh/locations/ColorLocations';
import { FragmentShader } from '../../shader/FragmentShader';
import { VertexShader } from '../../shader/VertexShader';
import { Material } from '../Material';
import { basicMaterialConfig } from './basic_material_config';
import { BasicMaterialFragmentShaderSource } from './shaders/BasicMaterialFragmentShaderSource';
import { BasicMaterialVertexShaderSource } from './shaders/BasicMaterialVertexShaderSource';

export class BasicMaterial extends Material {
  private _color!: Color;
  private readonly colorLocations: ColorLocations;
  private readonly colorBuffer: ColorBuffer;

  constructor({
    context,
    color = Color.random() /*, texture*/,
  }: basicMaterialConfig) {
    const { source: vsSource } = new BasicMaterialVertexShaderSource();
    const { source: fsSource } = new BasicMaterialFragmentShaderSource();
    const vertexShader = new VertexShader({ context, source: vsSource });
    const fragmentShader = new FragmentShader({ context, source: fsSource });
    super({ context, vertexShader, fragmentShader });
    this.colorLocations = new ColorLocations({
      context,
      program: this.program,
    });
    this.colorBuffer = new ColorBuffer({
      context,
      color,
      locations: this.colorLocations,
    });
    this.color = color;
  }

  get color(): Color {
    return this._color;
  }

  set color(color: Color) {
    this._color = color;
    this.program.use();
    this.colorBuffer.color = color;
  }
}

import { Color } from '../../color/Color';
import { TriangleColorBuffer } from '../../mesh/buffer/TriangleColorBuffer';
import { ColorLocations } from '../../mesh/locations/ColorLocations';
import { FragmentShader } from '../../shader/FragmentShader';
import { VertexShader } from '../../shader/VertexShader';
import { Material } from '../Material';
import { basicMaterialConfig } from './basic_material_config';
import { BasicMaterialFragmentShaderSource } from './shaders/BasicMaterialFragmentShaderSource';
import { BasicMaterialVertexShaderSource } from './shaders/BasicMaterialVertexShaderSource';

export class BasicMaterial extends Material {
  private _color!: Color;
  private colorLocations: ColorLocations;
  private colorBuffer: TriangleColorBuffer;

  constructor({
    context,
    color = Color.random() /*, texture*/,
  }: basicMaterialConfig) {
    const { source: vsSource } = new BasicMaterialVertexShaderSource();
    const { source: fsSource } = new BasicMaterialFragmentShaderSource();
    const vertexShader = new VertexShader({ context, source: vsSource });
    const fragmentShader = new FragmentShader({ context, source: fsSource });
    super({ context, vertexShader, fragmentShader });
    this.program.use();
    this.colorLocations = new ColorLocations({
      context,
      program: this.program,
    });
    this.colorBuffer = new TriangleColorBuffer({
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

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
  colorLocations: ColorLocations;
  colorBuffer: TriangleColorBuffer;

  constructor({ context, color /*, texture*/ }: basicMaterialConfig) {
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
      locations: this.colorLocations,
      color: new Float32Array(color ? color.values : Color.random().values),
    });
  }
}

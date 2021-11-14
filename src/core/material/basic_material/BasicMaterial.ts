import { Color } from '../../color/Color';
import { TextureCoordAttribute } from '../../mesh/attributes/TextureCoordAttribute';
import { ColorLocations } from '../../mesh/locations/ColorLocations';
import { TextureCoordLocations } from '../../mesh/locations/TextureCoordLocations';
import { ColorUniforms } from '../../mesh/uniforms/ColorUniforms';
import { FragmentShader } from '../../shader/FragmentShader';
import { VertexShader } from '../../shader/VertexShader';
import { Texture } from '../../texture/Texture';
import { Material } from '../Material';
import { basicMaterialConfig } from './basic_material_config';
import { BasicMaterialFragmentShaderSource } from './shaders/BasicMaterialFragmentShaderSource';
import { BasicMaterialVertexShaderSource } from './shaders/BasicMaterialVertexShaderSource';
import {
  BasicMaterialState,
  BasicMaterialStates,
} from './shaders/basic_material_state';

export class BasicMaterial extends Material {
  private _color: Color | undefined;
  private colorLocations: ColorLocations | undefined;
  private colorUniforms: ColorUniforms | undefined;
  private textureCoordsLocations: TextureCoordLocations | undefined;
  private textureCoordAttribute: TextureCoordAttribute | undefined;
  private texture: Texture | undefined;
  private state: BasicMaterialState;

  constructor({ context, color, texture }: basicMaterialConfig) {
    const state = new BasicMaterialState({ color, texture });
    const { source: vsSource } = new BasicMaterialVertexShaderSource(state);
    const { source: fsSource } = new BasicMaterialFragmentShaderSource(state);
    console.log(vsSource);
    console.log(fsSource);
    const vertexShader = new VertexShader({ context, source: vsSource });
    const fragmentShader = new FragmentShader({ context, source: fsSource });
    super({ context, vertexShader, fragmentShader });
    this.state = state;
    this.texture = texture;
    this.assignColor(color);
  }

  get color(): Color {
    return this._color!;
  }

  set color(color: Color) {
    this._color = color;
    if (!this.colorUniforms && !this.colorLocations) {
      this.createColorFields(color);
    }
    if (this.colorUniforms) {
      this.program.use();
      this.colorUniforms.color = color;
    }
  }

  set textureCoordinates(textureCoordinates: Float32Array | null) {
    super.textureCoordinates = textureCoordinates;
    if (textureCoordinates && this.texture) {
      this.textureCoordsLocations = new TextureCoordLocations({
        context: this.context,
        program: this.program,
      });
      this.textureCoordAttribute = new TextureCoordAttribute({
        context: this.context,
        locations: this.textureCoordsLocations,
        textureCoordinates,
      });
    }
  }

  private createColorFields(color: Color) {
    this.createColorLocations();
    this.createColorUniforms(color);
  }

  private createColorLocations() {
    this.colorLocations = new ColorLocations({
      context: this.context,
      program: this.program,
    });
  }

  private createColorUniforms(color: Color) {
    if (this.colorLocations) {
      this.colorUniforms = new ColorUniforms({
        context: this.context,
        color,
        locations: this.colorLocations,
      });
    }
  }

  private assignColor(color: Color = Color.random()) {
    if (
      this.state.value === BasicMaterialStates.COLOR_ONLY ||
      this.state.value === BasicMaterialStates.COLOR_AND_TEXTURE
    ) {
      this.color = color;
    }
  }
}

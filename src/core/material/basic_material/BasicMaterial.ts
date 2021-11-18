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
  private _texture: Texture | undefined;
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
    this.color = color;
  }

  get color(): Color {
    return this._color!;
  }

  set color(color: Color | undefined) {
    this.state = new BasicMaterialState({ color, texture: this.texture });

    switch (this.state.value) {
      case BasicMaterialStates.COLOR_ONLY:
      case BasicMaterialStates.COLOR_AND_TEXTURE:
        this._color = color;
        break;
      case BasicMaterialStates.RANDOM_COLOR:
        this._color = Color.random();
        break;
      case BasicMaterialStates.TEXTURE_ONLY:
        this._color = undefined;
        return;
      default:
        return;
    }

    this.program.use();

    if (!this.colorLocations) {
      this.colorLocations = this.createColorLocations();
    }

    if (!this.colorUniforms) {
      this.colorUniforms = this.createColorUniforms({
        color: this._color!,
        locations: this.colorLocations,
      });
    } else {
      this.colorUniforms.color = this._color!;
    }
  }

  get textureCoordinates(): Float32Array | undefined {
    return this._textureCoordinates;
  }

  set textureCoordinates(value: Float32Array | undefined) {
    this._textureCoordinates = value;

    if (!value) {
      return;
    }

    if (!this.textureCoordsLocations) {
      this.createTextureCoordsLocations();
    }

    if (!this.textureCoordAttribute) {
      this.createTextureCoordsAttribute(value);
    }
  }

  get texture(): Texture | undefined {
    return this._texture;
  }

  set texture(texture: Texture | undefined) {
    const state = new BasicMaterialState({ color: this.color, texture });
    this._texture = texture;
    /*if (!this.textureCoordinates) {
      this.textureCoordinates = new Float32Array([0, 1]);
    }
    if (!this.textureCoordsLocations) {
      this.createTextureCoordsLocations();
    }
    if (!this.textureCoordAttribute) {
      this.createTextureCoordsAttribute(this.textureCoordinates);
    }*/
  }

  bindTexture() {
    this._texture?.bind();
  }

  private createColorLocations(): ColorLocations {
    return new ColorLocations({
      context: this.context,
      program: this.program,
    });
  }

  private createTextureCoordsLocations() {
    this.textureCoordsLocations = new TextureCoordLocations({
      context: this.context,
      program: this.program,
    });
  }

  private createColorUniforms({
    color,
    locations,
  }: {
    color: Color;
    locations: ColorLocations;
  }): ColorUniforms {
    return new ColorUniforms({
      context: this.context,
      color,
      locations,
    });
  }

  private createTextureCoordsAttribute(textureCoordinates: Float32Array) {
    this.textureCoordAttribute = new TextureCoordAttribute({
      context: this.context,
      locations: this.textureCoordsLocations!,
      textureCoordinates,
    });
  }
}

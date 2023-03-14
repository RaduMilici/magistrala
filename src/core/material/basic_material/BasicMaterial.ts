import { Color } from '../../color/Color';
import { TextureCoordAttribute } from '../../mesh/attributes/TextureCoordAttribute';
import { TextureCoordLocations } from '../../mesh/locations/TextureCoordLocations';
import { Texture } from '../../texture/Texture';
import { Material } from '../Material';
import { basicMaterialConfig } from './basic_material_config';
import { BasicMaterialColor } from './properties/basic_material_color/BasicMaterialColor';
import { BasicMaterialFragmentShaderSource } from './shaders/BasicMaterialFragmentShaderSource';
import { BasicMaterialVertexShaderSource } from './shaders/BasicMaterialVertexShaderSource';
import {
  BasicMaterialState,
  BasicMaterialStates,
} from './shaders/basic_material_state';

export class BasicMaterial extends Material {
  basicMaterialColor: BasicMaterialColor | undefined;
  private textureCoordsLocations: TextureCoordLocations | undefined;
  private textureCoordAttribute: TextureCoordAttribute | undefined;
  private _texture: Texture | undefined;
  private state: BasicMaterialState;

  constructor({ context, color, texture }: basicMaterialConfig) {
    const state = new BasicMaterialState({ color, texture });
    const { vertexShader, fragmentShader } = Material.compileShadersFromSource({
      context,
      vertexShaderSource: new BasicMaterialVertexShaderSource(state).source,
      fragmentShaderSource: new BasicMaterialFragmentShaderSource(state).source,
    });
    super({ context, vertexShader, fragmentShader });
    this.state = state;
    this.texture = texture;
    this.color = color;
  }

  get color(): Color | undefined {
    return this.basicMaterialColor?.materialColor;
  }

  set color(color: Color | undefined) {
    const state = new BasicMaterialState({ color, texture: this.texture });
    console.log(state.value);
    if (!this.state.equals(state)) {
      this.state = state;
    }

    if (!BasicMaterialColor.isRequired(state)) {
      return;
    }

    this.basicMaterialColor = new BasicMaterialColor({
      color,
      state,
      context: this.context,
      program: this.program,
    });

    this.program.use();
  }

  get textureCoordinates(): Float32Array | undefined {
    return this._textureCoordinates;
  }

  set textureCoordinates(value: Float32Array | undefined) {
    this._textureCoordinates = value;

    if (!value) {
      return;
    }

    if (!this.textureCoordsLocations && this.texture) {
      this.createTextureCoordsLocations();
    }

    if (!this.textureCoordAttribute && this.texture) {
      this.createTextureCoordsAttribute(value);
    }
  }

  get texture(): Texture | undefined {
    return this._texture;
  }

  set texture(texture: Texture | undefined) {
    const { value } = new BasicMaterialState({ color: this.color, texture });
    if (
      value === BasicMaterialStates.TEXTURE_ONLY ||
      value === BasicMaterialStates.COLOR_AND_TEXTURE
    ) {
      if (!this.textureCoordinates) {
        this.textureCoordinates = new Float32Array([0, 1]);
      }
      this._texture = texture;
    }
  }

  bindTexture() {
    this._texture?.bind();
  }

  private createTextureCoordsLocations() {
    this.textureCoordsLocations = new TextureCoordLocations({
      context: this.context,
      program: this.program,
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

import { Color } from '../../../../color/Color';
import { ColorLocations } from '../../../../mesh/locations/ColorLocations';
import { locationsConfig } from '../../../../mesh/locations/locations_config';
import { ColorUniforms } from '../../../../mesh/uniforms/ColorUniforms';
import { Program } from '../../../../program/Program';
import {
  BasicMaterialState,
  BasicMaterialStates,
} from '../../shaders/basic_material_state';
import { basicMaterialColorConfig } from './basic_material_color_config';

export class BasicMaterialColor extends Color {
  locations: ColorLocations;
  uniforms: ColorUniforms;
  program: Program;
  state: BasicMaterialState;
  private readonly context: WebGL2RenderingContext;
  private _materialColor: Color | undefined;

  constructor({
    color,
    state,
    context,
    program,
  }: basicMaterialColorConfig & locationsConfig) {
    const chosenColor = BasicMaterialColor.getColorByState({ color, state });
    super(chosenColor.value);
    this.state = state;
    this.context = context;
    this.program = program;
    this.program.use();
    this.locations = new ColorLocations({
      context: this.context,
      program: this.program,
    });
    this.uniforms = new ColorUniforms({
      context: this.context,
      color: chosenColor,
      locations: this.locations,
    });
    this.materialColor = chosenColor;
  }

  get materialColor(): Color | undefined {
    return this._materialColor;
  }

  set materialColor(color: Color | undefined) {
    this.program.use();
    const chosenColor = BasicMaterialColor.getColorByState({
      color,
      state: this.state,
    });
    this._materialColor = chosenColor;
    this.uniforms.color = chosenColor;
  }

  static isRequired({ value }: BasicMaterialState): boolean {
    switch (value) {
      case BasicMaterialStates.COLOR_ONLY:
      case BasicMaterialStates.COLOR_AND_TEXTURE:
      case BasicMaterialStates.RANDOM_COLOR:
        return true;
      default:
        return false;
    }
  }

  static getColorByState({
    state: { value },
    color,
  }: basicMaterialColorConfig): Color {
    switch (value) {
      case BasicMaterialStates.COLOR_ONLY:
      case BasicMaterialStates.COLOR_AND_TEXTURE:
        return color || Color.BLACK;
      case BasicMaterialStates.RANDOM_COLOR:
        return Color.random();
      default:
        return Color.BLACK;
    }
  }
}

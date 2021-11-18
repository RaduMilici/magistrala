import { Color } from '../../color/Color';
import { colorBufferConfig } from '../buffer/buffer_configs';
import { ColorLocations } from '../locations/ColorLocations';

export class ColorUniforms {
  private _color!: Color;
  private locations: ColorLocations;
  private context: WebGL2RenderingContext;

  constructor({ context, locations, color }: colorBufferConfig) {
    this.locations = locations;
    this.context = context;
    this.color = color;
  }

  get color(): Color {
    return this._color;
  }

  set color(color: Color) {
    this._color = color;
    this.context.uniform4fv(
      this.locations.colorUniformLocation,
      new Float32Array(color.values),
    );
  }
}

import { Color } from '../../color/Color';
import { ColorLocations } from '../locations/ColorLocations';
import { Buffer } from './Buffer';
import { colorBufferConfig } from './buffer_configs';

export class ColorBuffer extends Buffer {
  private _color: Color;
  locations: ColorLocations;

  constructor({ context, locations, color }: colorBufferConfig) {
    super({ context, locations });
    this.locations = locations;
    this._color = color;
  }

  get color(): Color {
    return this._color;
  }

  set color(color: Color) {
    this._color = color;
    this.context.uniform4fv(
      this.locations.colorAttributeLocation,
      new Float32Array(color.values),
    );
  }
}

import { randomFloat } from 'pulsar-pathfinding';
import { colorValues } from './color_values';

export class Color {
  public static readonly VALUE_COUNT = 4;

  constructor(public value: colorValues) {}

  set(value: colorValues) {
    this.value = value;
  }

  copy(color: Color) {
    this.value = color.value;
  }

  get r(): number {
    return this.value.r;
  }

  get g(): number {
    return this.value.g;
  }

  get b(): number {
    return this.value.b;
  }

  get a(): number {
    return this.value.a ? this.value.a : 1;
  }

  get RBG(): Array<number> {
    return [this.r, this.g, this.b];
  }

  get values(): Array<number> {
    return [...this.RBG, this.a];
  }

  public static random(): Color {
    return new Color({
      r: randomFloat(0, 1),
      g: randomFloat(0, 1),
      b: randomFloat(0, 1),
      a: 1,
    });
  }

  public static from255({ r, g, b, a = 255 }: colorValues): Color {
    return new Color({
      r: r / 255,
      g: g / 255,
      b: b / 255,
      a: a / 255,
    });
  }

  public static multipleFrom255(values: Array<number>): Array<Color> {
    const colors: Array<Color> = [];
    for (let i = 0; i < values.length; i += 3) {
      const r = values[i];
      const g = values[i + 1];
      const b = values[i + 2];
      colors.push(Color.from255({ r, g, b }));
    }
    return colors;
  }
}

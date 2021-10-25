import { colorValues } from './color_values';

export class Color {
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
    return this.value.a;
  }

  public static from255({ r, g, b, a }: colorValues): Color {
    return new Color({
      r: r / 255,
      g: g / 255,
      b: b / 255,
      a: a / 255,
    });
  }
}

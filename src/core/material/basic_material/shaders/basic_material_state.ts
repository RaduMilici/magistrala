import { Color } from '../../../color/Color';
import { Texture } from '../../../texture/Texture';

export enum BasicMaterialStates {
  RANDOM_COLOR = 'RANDOM_COLOR',
  COLOR_ONLY = 'COLOR_ONLY',
  TEXTURE_ONLY = 'TEXTURE_ONLY',
  COLOR_AND_TEXTURE = 'COLOR_AND_TEXTURE',
}

export class BasicMaterialState {
  readonly value!: string;

  constructor({ color, texture }: { color?: Color; texture?: Texture }) {
    if (!color && !texture) {
      this.value = BasicMaterialStates.RANDOM_COLOR;
    } else if (color && !texture) {
      this.value = BasicMaterialStates.COLOR_ONLY;
    } else if (!color && texture) {
      this.value = BasicMaterialStates.TEXTURE_ONLY;
    } else if (color && texture) {
      this.value = BasicMaterialStates.COLOR_AND_TEXTURE;
    }
  }
}

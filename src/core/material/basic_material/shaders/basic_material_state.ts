import { Color } from '../../../color/Color';
import { Texture } from '../../../texture/Texture';

export enum BasicMaterialStates {
  COLOR_ONLY = 'COLOR_ONLY',
  TEXTURE_ONLY = 'TEXTURE_ONLY',
  COLOR_AND_TEXTURE = 'COLOR_AND_TEXTURE',
  NO_CONFIG = 'NO_CONFIG',
}

export class BasicMaterialState {
  readonly value: string;

  constructor({ color, texture }: { color?: Color; texture?: Texture }) {
    const noSettings = color === undefined && texture === undefined;
    const randomColor = noSettings ? Color.random() : null;
    const hasAnyColor = color !== undefined || randomColor !== null;
    const colorOnly = hasAnyColor && texture === undefined;
    const textureOnly = !hasAnyColor && texture !== undefined;
    const colorAndTexture = color !== undefined && texture !== undefined;

    if (colorOnly) {
      this.value = BasicMaterialStates.COLOR_ONLY;
    } else if (textureOnly) {
      this.value = BasicMaterialStates.TEXTURE_ONLY;
    } else if (colorAndTexture) {
      this.value = BasicMaterialStates.COLOR_AND_TEXTURE;
    } else {
      this.value = BasicMaterialStates.NO_CONFIG;
    }
  }
}

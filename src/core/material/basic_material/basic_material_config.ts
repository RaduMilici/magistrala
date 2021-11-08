import { Color } from '../../color/Color';
import { Texture } from '../../texture/Texture';

export type basicMaterialConfig = {
  context: WebGL2RenderingContext;
  color?: Color;
  texture?: Texture;
};

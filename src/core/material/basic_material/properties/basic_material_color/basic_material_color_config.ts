import { Color } from '../../../../color/Color';
import { BasicMaterialState } from '../../shaders/basic_material_state';

export type basicMaterialColorConfig = {
  color?: Color;
  state: BasicMaterialState;
};

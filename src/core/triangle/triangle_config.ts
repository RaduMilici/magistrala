import { Vector3 } from '../Vector3';
import { Color } from '../color/Color';

export type triangle_config = {
  a: Vector3;
  b: Vector3;
  c: Vector3;
  color?: Color;
};

import { Geometry } from '../geometry/Geometry';
import { Material } from '../material/Material';
import { Texture } from '../texture/Texture';
import { PerspectiveMatrix } from './transforms/matrices/perspective/PerspectiveMatrix';

export type meshConfig = {
  context: WebGL2RenderingContext;
  geometry: Geometry;
  perspectiveMatrix: PerspectiveMatrix;
  texture: Texture;
  material: Material;
};

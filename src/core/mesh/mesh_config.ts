import { Geometry } from '../geometry/Geometry';
import { Material } from '../material/Material';
import { PerspectiveMatrix } from './transforms/matrices/perspective/PerspectiveMatrix';

export type meshConfig = {
  context: WebGL2RenderingContext;
  geometry: Geometry;
  perspectiveMatrix: PerspectiveMatrix;
  material: Material;
};

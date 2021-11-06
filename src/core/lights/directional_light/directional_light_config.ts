import { Vector3 } from '../../Vector3';
import { Program } from '../../program/Program';

export type directionalLightConfig = {
  direction: Vector3;
  context: WebGL2RenderingContext;
  program: Program;
};

import { Geometry } from '../geometry/Geometry';

export type meshConfig = {
  context: WebGL2RenderingContext;
  geometry: Geometry;
  vertexShaderSource: string;
  fragmentShaderSource: string;
};

import { Geometry } from '../geometry/Geometry';
import { VertexShader } from '../shader/VertexShader';
import { FragmentShader } from '../shader/FragmentShader';

export type meshConfig = {
  context: WebGL2RenderingContext;
  geometry: Geometry;
  vertexShader: VertexShader;
  fragmentShader: FragmentShader;
};

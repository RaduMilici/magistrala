import { Geometry } from '../geometry/Geometry';
import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';
import { ProjectionMatrix } from './transforms/matrices/projection/ProjectionMatrix';

export type meshConfig = {
  context: WebGL2RenderingContext;
  geometry: Geometry;
  vertexShader: VertexShader;
  fragmentShader: FragmentShader;
  projectionMatrix: ProjectionMatrix;
};

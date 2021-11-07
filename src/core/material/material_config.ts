import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';

export type materialConfig = {
  context: WebGL2RenderingContext;
  vertexShader: VertexShader;
  fragmentShader: FragmentShader;
};

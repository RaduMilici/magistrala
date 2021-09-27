import { VertexShader } from '../shader/VertexShader';
import { FragmentShader } from '../shader/FragmentShader';

export type programConfig = {
  vertexShader: VertexShader;
  fragmentShader: FragmentShader;
  context: WebGL2RenderingContext;
  debug: boolean;
};

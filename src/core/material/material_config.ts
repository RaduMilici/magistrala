import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';

export type materialSourceConfig = {
  context: WebGL2RenderingContext;
  vertexShaderSource: string;
  fragmentShaderSource: string;
};

export type materialConfig = {
  context: WebGL2RenderingContext;
  vertexShader: VertexShader;
  fragmentShader: FragmentShader;
};

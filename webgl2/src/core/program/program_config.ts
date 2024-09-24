import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';

export type programConfig = {
    vertexShader: VertexShader;
    fragmentShader: FragmentShader;
    context: WebGL2RenderingContext;
    debug: boolean;
};

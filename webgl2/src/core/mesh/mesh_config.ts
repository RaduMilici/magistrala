import { Geometry } from '../geometry/Geometry';
import { FragmentShader } from '../shader/FragmentShader';
import { VertexShader } from '../shader/VertexShader';
import { Texture } from '../texture/Texture';
import { PerspectiveMatrix } from './transforms/matrices/perspective/PerspectiveMatrix';

export type meshConfig = {
    context: WebGL2RenderingContext;
    geometry: Geometry;
    vertexShader: VertexShader;
    fragmentShader: FragmentShader;
    perspectiveMatrix: PerspectiveMatrix;
    texture: Texture;
};

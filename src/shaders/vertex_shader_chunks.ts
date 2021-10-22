import { VERTEX_SHADER_BOILERPLATE } from '../core/shader/chunks/variables';
import { getRotatedPosition } from '../core/shader/chunks/functions';

export const vertexShaderChunks = `${VERTEX_SHADER_BOILERPLATE}
${getRotatedPosition}

void main() {
  fragColor = a_vertColor;
  gl_PointSize = u_pointSize;
  
  vec2 rotatedPosition = getRotatedPosition(a_position, u_rotation);
  gl_Position = vec4(rotatedPosition * u_scale + u_translation, 0., 1.);
}
`;

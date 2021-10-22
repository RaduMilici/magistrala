import { VERTEX_SHADER_BOILERPLATE } from '../core/shader/chunks/variables';
import { getClipSpace } from '../core/shader/chunks/functions';

export const vertexShaderPixelPosition = `${VERTEX_SHADER_BOILERPLATE}
${getClipSpace}

void main() {
  fragColor = a_vertColor;
  gl_PointSize = u_pointSize;

  vec2 clipSpace = getClipSpace(a_position, u_resolution);
  gl_Position = vec4(clipSpace, 0, 1);
}
`;

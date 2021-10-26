import { VERTEX_SHADER_BOILERPLATE } from '../core/shader/chunks/variables';
import { AttributeNames, UniformNames } from '../core/mesh/location_names';

export const vertexShaderChunks = `${VERTEX_SHADER_BOILERPLATE}

void main() {
  fragColor = a_vertColor;
  gl_PointSize = u_pointSize;
  
  // vec2 rotatedPosition = getRotatedPosition(a_position, u_rotation);
  // gl_Position = vec4(rotatedPosition * u_scale + u_translation, 0., 1.);
  // vec2 position  = (${UniformNames.MATRIX} * vec3(${AttributeNames.POSITION}, 1)).xy;
  // gl_Position = vec4(position * vec2(1, -1), 0, 1);
  gl_Position = ${UniformNames.MATRIX} * ${AttributeNames.POSITION};
}
`;

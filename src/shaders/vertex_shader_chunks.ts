import { VERTEX_SHADER_BOILERPLATE } from '../core/shader/chunks/variables';
import { AttributeNames, UniformNames } from '../core/mesh/location_names';

export const vertexShaderChunks = `${VERTEX_SHADER_BOILERPLATE}

void main() {
  fragColor = a_vertColor;
  gl_PointSize = u_pointSize;

  gl_Position = ${UniformNames.MATRIX} * ${AttributeNames.POSITION};
}
`;

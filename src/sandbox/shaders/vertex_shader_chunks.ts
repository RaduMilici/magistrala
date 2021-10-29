import {
  COLOR_VARYING,
  VERTEX_SHADER_BOILERPLATE,
} from '../../core/shader/chunks/variables';
import {
  AttributeNames,
  UniformNames,
  VaryingNames,
} from '../../core/mesh/location_names';

export const vertexShaderChunks = `${VERTEX_SHADER_BOILERPLATE}

${COLOR_VARYING}

void main() {
  fragColor = a_vertColor;
  gl_PointSize = u_pointSize;

  gl_Position = ${UniformNames.MATRIX} * ${AttributeNames.POSITION};
  ${VaryingNames.COLOR} = ${AttributeNames.COLOR};
}
`;

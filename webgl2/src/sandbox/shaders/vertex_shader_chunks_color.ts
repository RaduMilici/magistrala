import { AttributeNames, UniformNames, VaryingNames } from '../../core/mesh/location_names';
import { VERTEX_SHADER_BOILERPLATE } from '../../core/shader/chunks/variables';

export const vertexShaderChunks = `${VERTEX_SHADER_BOILERPLATE}

void main() {
  ${VaryingNames.COLOR} = ${AttributeNames.COLOR};
  ${VaryingNames.TEXTURE_COORD} = ${AttributeNames.TEXTURE_COORD};
  ${VaryingNames.NORMAL} = ${AttributeNames.NORMAL};
  
  fragColor = ${AttributeNames.VERTEX_COLOR};
  gl_PointSize = ${UniformNames.POINT_SIZE};
  gl_Position = ${UniformNames.MATRIX} * ${AttributeNames.POSITION};
}
`;

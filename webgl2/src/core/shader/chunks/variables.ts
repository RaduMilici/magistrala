import { AttributeNames, UniformNames, VaryingNames } from '../../mesh/location_names';

export const VERSION = '#version 300 es';

export const POSITION_ATTRIBUTE = `in vec4 ${AttributeNames.POSITION};`;
export const COLOR_ATTRIBUTE = `in vec4 ${AttributeNames.COLOR};`;
export const VERT_COLOR_ATTRIBUTE = `in vec3 ${AttributeNames.VERTEX_COLOR};`;
export const NORMAL_ATTRIBUTE = `in vec3 ${AttributeNames.NORMAL};`;
export const TEXTURE_COORD_ATTRIBUTE = `in vec2 ${AttributeNames.TEXTURE_COORD};`;

export const TRANSLATION_UNIFORMS = `uniform mat4 ${UniformNames.MATRIX};`;
export const PONT_SIZE_UNIFORM = `uniform float ${UniformNames.POINT_SIZE};`;

export const COLOR_VARYING = `out vec4 ${VaryingNames.COLOR};`;
export const TEXTURE_COORD_VARYING = `out vec2 ${VaryingNames.TEXTURE_COORD};`;
export const NORMAL_VARYING = `out vec3 ${VaryingNames.NORMAL};`;
export const FRAG_COLOR_VARYING = 'out vec3 fragColor;';

export const VERTEX_SHADER_BOILERPLATE = `${VERSION}
${POSITION_ATTRIBUTE}
${COLOR_ATTRIBUTE}
${VERT_COLOR_ATTRIBUTE}
${NORMAL_ATTRIBUTE}
${TEXTURE_COORD_ATTRIBUTE}
${TRANSLATION_UNIFORMS}
${PONT_SIZE_UNIFORM}
${FRAG_COLOR_VARYING}
${COLOR_VARYING}
${TEXTURE_COORD_VARYING}
${NORMAL_VARYING}`;

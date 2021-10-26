import { AttributeNames, UniformNames } from '../../mesh/location_names';

export const VERSION = '#version 300 es';

export const POSITION_ATTRIBUTE = `in vec2 ${AttributeNames.POSITION};`;
export const VERT_COLOR_ATTRIBUTE = `in vec3 ${AttributeNames.VERTEX_COLOR};`;

export const TRANSLATION_UNIFORMS = `uniform mat3 ${UniformNames.MATRIX};`;
export const PONT_SIZE_UNIFORM = `uniform float ${UniformNames.POINT_SIZE};`;

export const OUT_COLOR = 'out vec3 fragColor;';

export const VERTEX_SHADER_BOILERPLATE = `${VERSION}
${POSITION_ATTRIBUTE}
${VERT_COLOR_ATTRIBUTE}
${TRANSLATION_UNIFORMS}
${PONT_SIZE_UNIFORM}
${OUT_COLOR}`;

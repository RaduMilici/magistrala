import {
  AttributeNames,
  UniformNames,
  VaryingNames,
} from '../../../mesh/location_names';

export const Attributes = {
  POSITION: `vec4 ${AttributeNames.POSITION}`,
  COLOR: `vec4 ${AttributeNames.COLOR}`,
  TEX_COORD: `vec2 ${AttributeNames.TEX_COORD}`,
};

export const Uniforms = {
  COLOR: `vec4 ${UniformNames.COLOR}`,
  TRANSLATION_MATRIX: `mat4 ${UniformNames.MATRIX}`,
  TEXTURE: `sampler2D ${UniformNames.TEXTURE}`,
};

export const Varyings = {
  COLOR: `vec4 ${VaryingNames.COLOR}`,
  TEX_COORD: `vec2 ${VaryingNames.TEX_COORD}`,
};

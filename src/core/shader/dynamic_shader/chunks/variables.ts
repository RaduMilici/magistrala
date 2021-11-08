import {
  AttributeNames,
  UniformNames,
  VaryingNames,
} from '../../../mesh/location_names';

export const Attributes = {
  POSITION: `vec4 ${AttributeNames.POSITION}`,
  COLOR: `vec4 ${AttributeNames.COLOR}`,
};

export const Uniforms = {
  COLOR: `vec4 ${UniformNames.COLOR}`,
  TRANSLATION_MATRIX: `mat4 ${UniformNames.MATRIX}`,
};

export const Varyings = {
  COLOR: `vec4 ${VaryingNames.COLOR}`,
};

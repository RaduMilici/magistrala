import {
  AttributeNames,
  UniformNames,
  VaryingNames,
} from '../../../mesh/location_names';

export const Attributes = {
  position: `vec4 ${AttributeNames.POSITION}`,
  color: `vec4 ${AttributeNames.COLOR}`,
};

export const Uniforms = {
  color: `vec4 ${UniformNames.COLOR}`,
  translationMatrix: `mat4 ${UniformNames.MATRIX}`,
};

export const Varyings = {
  color: `vec4 ${VaryingNames.COLOR}`,
};

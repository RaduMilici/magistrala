/**
 * A single floating-point uniform value (e.g., float).
 */
export type UniformFloat = [number];

/**
 * A 2-component floating-point uniform value (e.g., vec2).
 */
export type UniformVec2 = [number, number];

/**
 * A 3-component floating-point uniform value (e.g., vec3).
 */
export type UniformVec3 = [number, number, number];

/**
 * A 4-component floating-point uniform value (e.g., vec4).
 */
export type UniformVec4 = [number, number, number, number];

/**
 * Union type representing any valid uniform value that can be a single float,
 * a 2-component vector, a 3-component vector, or a 4-component vector.
 */
export type UniformValue = UniformFloat | UniformVec2 | UniformVec3 | UniformVec4;

/**
 * Enum representing the different types of uniform values (float, vec2, vec3, vec4).
 */
export enum UniformType {
    Float = 'float',
    Vec2 = 'vec2',
    Vec3 = 'vec3',
    Vec4 = 'vec4',
}

/**
 * Enum representing the size (number of components) for each uniform type.
 * - `Float` corresponds to 1 component.
 * - `Vec2` corresponds to 2 components.
 * - `Vec3` corresponds to 3 components.
 * - `Vec4` corresponds to 4 components.
 */
export enum UniformLength {
    Float = 1,
    Vec2 = 2,
    Vec3 = 3,
    Vec4 = 4,
}

/**
 * A mapping between a `UniformType` and its corresponding size.
 * Maps `UniformType.Float` to `UniformSize.Float`, and similarly for vec2, vec3, and vec4.
 */
export const UniformTypeToLengthMap: Record<UniformType, UniformLength> = {
    [UniformType.Float]: UniformLength.Float,
    [UniformType.Vec2]: UniformLength.Vec2,
    [UniformType.Vec3]: UniformLength.Vec3,
    [UniformType.Vec4]: UniformLength.Vec4,
};

/**
 * Schema for defining a set of uniform types where each uniform is associated
 * with a string name and a `UniformType`.
 */
export interface UniformSchema {
    instaces: number;
    schema: Record<string, UniformType>;
}

/**
 * Represents a uniform property, including its type and offset within a uniform buffer.
 */
export interface UniformProperty {
    /**
     * The type of the uniform (e.g., float, vec2, vec3, vec4).
     */
    type: UniformType;

    /**
     * The byte offset for this uniform within the uniform buffer.
     */
    offset: number;
}

/**
 * A layout that maps uniform names (string) to their corresponding `UniformProperty`.
 */
export type Layout = Record<string, UniformProperty>;

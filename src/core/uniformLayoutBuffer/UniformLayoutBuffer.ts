import { Layout, UniformSchema, UniformType, UniformTypeToLengthMap, UniformValue } from './uniformLayoutBufferTypes';

/**
 * Class representing a layout for a uniform buffer in WebGPU.
 *
 * This class handles creating a buffer of uniform values based on a provided schema,
 * and allows you to set the values for each uniform in the layout.
 */
export class UniformBufferLayout {
    /**
     * The total size of the uniform buffer, in float components.
     */
    size: number;

    private instanceLength: number;

    /**
     * The underlying Float32Array buffer that stores the uniform values.
     */
    private _data: Float32Array;

    /**
     * The layout that maps uniform names to their corresponding types and offsets in the buffer.
     */
    private layout: Layout = {};

    /**
     * The number of bytes per float component (4 bytes per float).
     */
    private static readonly BYTES_PER_FLOAT = 4;

    /**
     * Constructs a new UniformBufferLayout based on a provided schema.
     * The schema defines the uniform types and names, and this constructor calculates
     * the offsets and total size of the buffer.
     *
     * @param schema - The schema that defines the names and types of uniforms.
     */
    constructor({ instaces = 1, schema }: UniformSchema) {
        const { layout, length } = this.getLayout({ instaces, schema });
        this.layout = layout;
        this._data = new Float32Array(length);
        this.instanceLength = length / instaces;
        this.size = this._data.length * UniformBufferLayout.BYTES_PER_FLOAT;
    }

    /**
     * Returns the underlying buffer that stores the uniform values.
     *
     * @returns The Float32Array buffer containing the uniform values.
     */
    public get data(): Float32Array {
        return this._data;
    }

    /**
     * Sets the value of a specific uniform in the buffer.
     *
     * This method validates that the number of values matches the expected size
     * of the uniform type, and then writes the values into the buffer at the correct offset.
     *
     * @param name - The name of the uniform to set.
     * @param values - The array of values to set for the uniform. The size of the array must match the uniform type (e.g., 1 for `float`, 2 for `vec2`).
     * @throws Error if the uniform name does not exist in the layout or the value length does not match the expected size.
     */
    public setProperty({ name, values, offset = 0 }: { name: string; values: UniformValue; offset?: number }): void {
        const property = this.layout[name];
        if (!property) {
            throw new Error(`Property ${name} does not exist in the uniform buffer layout`);
        }

        const expectedLength = this.getTypeLength(property.type);
        if (values.length !== expectedLength) {
            throw new Error(`Expected ${expectedLength} values for property ${name}, but got ${values.length}`);
        }

        this._data.set(values, offset * this.instanceLength + property.offset);
    }

    /**
     * Calculates the layout for the uniform buffer based on the provided schema.
     *
     * For each uniform, this method calculates its offset in the buffer and
     * updates the total size of the buffer.
     *
     * @param schema - The schema that defines the names and types of uniforms.
     * @returns An object containing the calculated layout and total buffer size.
     */
    private getLayout({ instaces = 1, schema }: UniformSchema) {
        const layout: Layout = {};
        let length = 0;

        for (const [name, type] of Object.entries(schema)) {
            layout[name] = { type, offset: length };
            length += this.getTypeLength(type);
        }

        length *= instaces;

        return { layout, length };
    }

    /**
     * Retrieves the size (in float components) for a given uniform type.
     *
     * @param type - The uniform type (e.g., `float`, `vec2`, `vec3`, `vec4`).
     * @returns The size (number of float components) for the given uniform type.
     * @throws Error if the uniform type is not recognized.
     */
    private getTypeLength(type: UniformType): number {
        const length = UniformTypeToLengthMap[type];
        if (length === undefined) {
            throw new Error(`Unknown uniform type: ${type}`);
        }
        return length;
    }
}

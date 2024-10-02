import { Layout, UniformSchema, UniformType, UniformTypeToSizeMap, UniformValue } from './uniformLayoutBufferTypes';

/**
 * Class representing a layout for a uniform buffer in WebGPU.
 *
 * This class handles creating a buffer of uniform values based on a provided schema,
 * and allows you to set the values for each uniform in the layout.
 */
export class UniformBufferLayout {
    /**
     * The underlying Float32Array buffer that stores the uniform values.
     */
    private _buffer: Float32Array;

    /**
     * The layout that maps uniform names to their corresponding types and offsets in the buffer.
     */
    private layout: Layout = {};

    /**
     * The total size of the uniform buffer, in float components.
     */
    private totalSize: number;

    /**
     * Constructs a new UniformBufferLayout based on a provided schema.
     * The schema defines the uniform types and names, and this constructor calculates
     * the offsets and total size of the buffer.
     *
     * @param schema - The schema that defines the names and types of uniforms.
     */
    constructor(schema: UniformSchema) {
        const { layout, totalSize } = this.getLayout(schema);
        this.layout = layout;
        this.totalSize = totalSize;
        this._buffer = new Float32Array(this.totalSize);
    }

    /**
     * Returns the underlying buffer that stores the uniform values.
     *
     * @returns The Float32Array buffer containing the uniform values.
     */
    public get buffer(): Float32Array {
        return this._buffer;
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
    public setProperty(name: string, values: UniformValue): void {
        const property = this.layout[name];
        if (!property) {
            throw new Error(`Property ${name} does not exist in the uniform buffer layout`);
        }

        const expectedSize = this.getTypeSize(property.type);
        if (values.length !== expectedSize) {
            throw new Error(`Expected ${expectedSize} values for property ${name}, but got ${values.length}`);
        }

        this._buffer.set(values, property.offset);
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
    private getLayout(schema: UniformSchema) {
        const layout: Layout = {};
        let totalSize = 0;

        for (const [name, type] of Object.entries(schema)) {
            layout[name] = { type, offset: totalSize };
            totalSize += this.getTypeSize(type);
        }

        return { layout, totalSize };
    }

    /**
     * Retrieves the size (in float components) for a given uniform type.
     *
     * @param type - The uniform type (e.g., `float`, `vec2`, `vec3`, `vec4`).
     * @returns The size (number of float components) for the given uniform type.
     * @throws Error if the uniform type is not recognized.
     */
    private getTypeSize(type: UniformType): number {
        const size = UniformTypeToSizeMap[type];
        if (size === undefined) {
            throw new Error(`Unknown uniform type: ${type}`);
        }
        return size;
    }
}

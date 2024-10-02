export enum UniformType {
    Float = 'float',
    Vec2 = 'vec2',
    Vec3 = 'vec3',
    Vec4 = 'vec4',
}

enum UniformSize {
    Float = 1,
    Vec2 = 2,
    Vec3 = 3,
    Vec4 = 4,
}

const UniformTypeToSizeMap: Record<UniformType, UniformSize> = {
    [UniformType.Float]: UniformSize.Float,
    [UniformType.Vec2]: UniformSize.Vec2,
    [UniformType.Vec3]: UniformSize.Vec3,
    [UniformType.Vec4]: UniformSize.Vec4,
};

type UniformSchema = Record<string, UniformType>;

interface UniformProperty {
    type: UniformType;
    offset: number;
}

type Layout = Record<string, UniformProperty>;

export class UniformBufferLayout {
    private _buffer: Float32Array;
    private layout: Layout = {};
    private totalSize: number;

    constructor(schema: UniformSchema) {
        const { layout, totalSize } = this.getLayout(schema);
        this.layout = layout;
        this.totalSize = totalSize;
        this._buffer = new Float32Array(this.totalSize);
    }

    public get buffer(): Float32Array {
        return this._buffer;
    }

    public setProperty(name: string, values: number[]): void {
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

    private getLayout(schema: UniformSchema) {
        const layout: Layout = {};
        let totalSize = 0;

        for (const [name, type] of Object.entries(schema)) {
            layout[name] = { type, offset: totalSize };
            totalSize += this.getTypeSize(type);
        }

        return { layout, totalSize };
    }

    private getTypeSize(type: UniformType): number {
        const size = UniformTypeToSizeMap[type];
        if (size === undefined) {
            throw new Error(`Unknown uniform type: ${type}`);
        }
        return size;
    }
}

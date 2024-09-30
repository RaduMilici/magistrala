/**
 * Configuration interface for creating a GPU shader module.
 */
interface ShaderConfig {
    /**
     * A label for identifying the shader module, useful for debugging.
     */
    label: string;

    /**
     * The WGSL or SPIR-V shader source code as a string.
     */
    code: string;

    /**
     * The GPU device used to create the shader module.
     */
    device: GPUDevice;
}

/**
 * A class that represents a compiled GPU shader module.
 */
export class Shader {
    /**
     * The compiled shader module used in rendering pipelines.
     */
    readonly module: GPUShaderModule;

    /**
     * Creates an instance of the `Shader` class.
     *
     * @param config - The configuration object that contains the label, shader code, and GPU device.
     */
    constructor({ label, code, device }: ShaderConfig) {
        this.module = device.createShaderModule({ label, code });
    }
}

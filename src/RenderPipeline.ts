/**
 * Configuration options for creating a `RenderPipeline`.
 */
interface RenderPipelineConfig {
    /**
     * The GPU device that will be used to create the render pipeline.
     */
    device: GPUDevice;

    /**
     * The vertex state, which includes the entry point and layout of the vertex stage of the pipeline.
     */
    vertexState: GPUVertexState;

    /**
     * The fragment state, which includes the entry point and layout of the fragment stage of the pipeline.
     */
    fragmentState: GPUFragmentState;

    /**
     * Optional layout for the pipeline, which defines how resources are bound to the pipeline.
     * @default 'auto'
     */
    layout?: GPUPipelineLayout | 'auto';
}

/**
 * Class for managing the creation and usage of a GPU render pipeline.
 *
 * A render pipeline is responsible for defining the configuration
 * of both the vertex and fragment shader stages and how data is processed
 * between them. It also includes information about how vertex data is fed
 * into the pipeline.
 *
 * @class RenderPipeline
 */
export class RenderPipeline {
    /**
     * The underlying WebGPU pipeline object.
     *
     * @readonly
     */
    readonly pipeline: GPURenderPipeline;

    /**
     * Default layout configuration for the pipeline, set to 'auto' which lets WebGPU infer the layout.
     */
    private static DefaultLayout: 'auto' = 'auto';

    /**
     * Creates an instance of `RenderPipeline`.
     * @param {RenderPipelineConfig} config - The configuration object containing device, vertexState, fragmentState, and optional layout.
     */
    constructor({ device, vertexState, fragmentState, layout = RenderPipeline.DefaultLayout }: RenderPipelineConfig) {
        this.pipeline = device.createRenderPipeline({
            label: 'render pipeline',
            layout,
            vertex: vertexState,
            fragment: fragmentState,
        });
    }
}

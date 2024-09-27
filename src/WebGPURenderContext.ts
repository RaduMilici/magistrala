import { WebGPURenderContextError } from './Errors';

/**
 * Configuration interface for setting up a WebGPURenderContext.
 */
interface WebGPURenderContextConfig {
    /** The HTMLCanvasElement where the WebGPU rendering will take place. */
    canvas: HTMLCanvasElement;
    /** Optional power preference for selecting the appropriate GPU. Defaults to 'high-performance'. */
    powerPreference?: GPUPowerPreference;
}

/**
 * Manages the WebGPU adapter, device, and canvas context.
 */
export class WebGPURenderContext {
    /** The GPU adapter selected for WebGPU rendering. */
    adapter: GPUAdapter | null = null;
    /** The GPU device created from the adapter. */
    device: GPUDevice | null = null;
    /** The GPU canvas context used for rendering. */
    context: GPUCanvasContext | null = null;

    private readonly canvas: HTMLCanvasElement;
    private readonly powerPreference: GPUPowerPreference;
    private static readonly DefaultPowerPreference: GPUPowerPreference = 'high-performance';

    /**
     * @param config - The configuration object containing the canvas and optional power preference.
     */
    constructor({ canvas, powerPreference = WebGPURenderContext.DefaultPowerPreference }: WebGPURenderContextConfig) {
        this.canvas = canvas;
        this.powerPreference = powerPreference;
    }

    /**
     * @returns `true` if the adapter, device, and context have been initialized; `false` otherwise.
     */
    get isInitialized(): boolean {
        return this.adapter !== null && this.device !== null && this.context !== null;
    }

    /**
     * Initializes the WebGPU adapter, device, and canvas context.
     *
     * @throws Will throw an error if the adapter, device, or context cannot be obtained.
     */
    async init(): Promise<void> {
        if (this.isInitialized) {
            console.warn(WebGPURenderContextError.AlreadyInitialized);
            return;
        }

        this.adapter = await navigator.gpu.requestAdapter({
            powerPreference: this.powerPreference,
        });

        if (!this.adapter) {
            throw new Error(WebGPURenderContextError.AdapterNotFound);
        }

        this.device = await this.adapter.requestDevice();

        if (!this.device) {
            throw new Error(WebGPURenderContextError.DeviceNotFound);
        }

        this.context = this.canvas.getContext('webgpu');

        if (!this.context) {
            throw new Error(WebGPURenderContextError.ContextNotFound);
        }

        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat(),
        });
    }
}

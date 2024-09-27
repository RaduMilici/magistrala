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
    private _adapter: GPUAdapter | null = null;
    private _device: GPUDevice | null = null;
    private _context: GPUCanvasContext | null = null;
    private _textureFormat: GPUTextureFormat | null = null;
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
     * Retrieves the GPU adapter selected for WebGPU rendering.
     * @throws Will throw an error if the WebGPU adapter has not been initialized.
     * @returns The `GPUAdapter` used for WebGPU rendering.
     */
    get adapter(): GPUAdapter {
        if (!this._adapter) {
            throw new Error(WebGPURenderContextError.AdapterNotInitialized);
        }
        return this._adapter;
    }

    /**
     * Retrieves the GPU device created from the adapter.
     * @throws Will throw an error if the WebGPU device has not been initialized.
     * @returns The `GPUDevice` created from the GPU adapter.
     */
    get device(): GPUDevice {
        if (!this._device) {
            throw new Error(WebGPURenderContextError.DeviceNotInitialized);
        }
        return this._device;
    }

    /**
     * Retrieves the GPU canvas context used for rendering.
     * @throws Will throw an error if the WebGPU canvas context has not been initialized.
     * @returns The `GPUCanvasContext` used for rendering.
     */
    get context(): GPUCanvasContext {
        if (!this._context) {
            throw new Error(WebGPURenderContextError.ContextNotInitialized);
        }
        return this._context;
    }

    /**
     * Retrieves the GPU texture format for the canvas.
     * @throws Will throw an error if the WebGPU context has not been initialized.
     * @returns The `GPUTextureFormat` used for the canvas rendering.
     */
    get textureFormat(): GPUTextureFormat {
        if (!this._textureFormat) {
            throw new Error(WebGPURenderContextError.ContextNotInitialized);
        }
        return this._textureFormat;
    }

    /**
     * @returns `true` if the adapter, device, and context have been initialized; `false` otherwise.
     */
    get isInitialized(): boolean {
        return this._adapter !== null && this._device !== null && this._context !== null;
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

        this._adapter = await navigator.gpu.requestAdapter({
            powerPreference: this.powerPreference,
        });

        if (!this._adapter) {
            throw new Error(WebGPURenderContextError.AdapterNotFound);
        }

        this._device = await this._adapter.requestDevice();

        if (!this._device) {
            throw new Error(WebGPURenderContextError.DeviceNotFound);
        }

        this._context = this.canvas.getContext('webgpu');

        if (!this._context) {
            throw new Error(WebGPURenderContextError.ContextNotFound);
        }

        this._textureFormat = navigator.gpu.getPreferredCanvasFormat();

        this._context.configure({
            device: this._device,
            format: this._textureFormat,
        });
    }
}

export enum WebGPURenderContextError {
    AdapterNotFound = 'WebGPURenderContext: Could not find a GPU adapter. Ensure that WebGPU is supported in your browser and that the GPU driver is up to date.',
    DeviceNotFound = 'WebGPURenderContext: Failed to request a GPU device. Ensure that your system has a compatible GPU and sufficient permissions are granted.',
    ContextNotFound = 'WebGPURenderContext: Could not get a WebGPU context from the canvas. Ensure the canvas element exists, has valid dimensions, and is not being used with another rendering context (e.g., 2D or WebGL).',
    AlreadyInitialized = 'WebGPURenderContext: Initialization was called more than once. The context is already set up and repeated initialization may cause unexpected behavior.',
}

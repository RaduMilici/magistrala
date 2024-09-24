export const drawTriangle = async () => {
    const adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance',
    });

    if (!adapter) {
        throw new Error('could not get adapter');
    }

    const device = await adapter.requestDevice();

    if (!device) {
        throw new Error('could not get device');
    }

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const context = canvas.getContext('webgpu');

    if (!context) {
        throw new Error('could not get context');
    }

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

    context.configure({
        device,
        format: presentationFormat,
    });

    const shaderModule = device.createShaderModule({
        label: 'triangle',
        code: `
            @vertex fn vs(
                @builtin(vertex_index) vertexIndex: u32
            ) -> @builtin(position) vec4f {
                let pos = array(
                    vec2f(0.0, 1.0),
                    vec2f(-1.0, -1.0),
                    vec2f(1.0, -1.0)
                );

                return vec4f(pos[vertexIndex], 0.0, 1.0);
            }

            @fragment fn fs() -> @location(0) vec4f {
                return vec4f(0.0, 0.0, 1.0, 1.0);
            }
        `,
    });

    const renderPipeline = device.createRenderPipeline({
        label: 'triangle pipeline',
        layout: 'auto',
        vertex: {
            entryPoint: 'vs',
            module: shaderModule,
        },
        fragment: {
            entryPoint: 'fs',
            module: shaderModule,
            targets: [{ format: presentationFormat }],
        },
    });

    const renderPassDescriptor: GPURenderPassDescriptor = {
        label: 'triangle render pass',
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                clearValue: [0.3, 0.3, 0.3, 1],
                loadOp: 'clear',
                storeOp: 'store',
            },
        ],
    };

    const encoder = device.createCommandEncoder({
        label: 'triangle encoder',
    });

    const renderPass = encoder.beginRenderPass(renderPassDescriptor);
    renderPass.setPipeline(renderPipeline);
    renderPass.draw(3);
    renderPass.end();

    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
};

const main = async () => {
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

    const module = device.createShaderModule({
        label: 'red triangle',
        code: `
            @vertex fn vs(
                @builtin(vertex_index) vertexIndex: u32
            ) -> @builtin(position) vec4f {
                let pos = array(
                    vec2f(0.0, 0.9),
                    vec2f(-0.9, -0.9),
                    vec2f(0.9, -0.9)
                );

                return vec4f(pos[vertexIndex], 0.0, 1.0);
            }

            @fragment fn fs() -> @location(0) vec4f {
                return vec4f(0.0, 0.0, 1.0, 1.0);
            }
        `,
    });

    const pipeline = device.createRenderPipeline({
        label: 'red triangle pipeline',
        layout: 'auto',
        vertex: {
            entryPoint: 'vs',
            module,
        },
        fragment: {
            entryPoint: 'fs',
            module,
            targets: [{ format: presentationFormat }],
        },
    });

    const renderPassDescriptor: GPURenderPassDescriptor = {
        label: 'red triangle render pass',
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
        label: 'red triangle encoder',
    });

    const pass = encoder.beginRenderPass(renderPassDescriptor);
    pass.setPipeline(pipeline);
    pass.draw(3);
    pass.end();

    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
};

main();

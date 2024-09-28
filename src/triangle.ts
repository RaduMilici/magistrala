import { RenderPipeline } from './RenderPipeline';
import { Shader } from './Shader';
import { WebGPURenderContext } from './WebGPURenderContext';
import { testShader } from './testShader';

export const drawTriangle = async () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const webGPURenderContext = new WebGPURenderContext({ canvas, powerPreference: 'high-performance' });
    await webGPURenderContext.initialize();

    const shader = new Shader({
        label: 'triangle shader module',
        code: testShader,
        device: webGPURenderContext.device,
    });

    const renderPipeline = new RenderPipeline({
        device: webGPURenderContext.device,
        vertexState: {
            entryPoint: 'vs',
            module: shader.module,
        },
        fragmentState: {
            entryPoint: 'fs',
            module: shader.module,
            targets: [{ format: webGPURenderContext.textureFormat }],
        },
    });

    const renderPassDescriptor: GPURenderPassDescriptor = {
        label: 'triangle render pass',
        colorAttachments: [
            {
                view: webGPURenderContext.context.getCurrentTexture().createView(),
                clearValue: [0.3, 0.3, 0.3, 1],
                loadOp: 'clear',
                storeOp: 'store',
            },
        ],
    };

    const encoder = webGPURenderContext.device.createCommandEncoder({
        label: 'triangle encoder',
    });

    const renderPass = encoder.beginRenderPass(renderPassDescriptor);
    renderPass.setPipeline(renderPipeline.pipeline);
    renderPass.draw(3);
    renderPass.end();

    const commandBuffer = encoder.finish();
    webGPURenderContext.device.queue.submit([commandBuffer]);
};

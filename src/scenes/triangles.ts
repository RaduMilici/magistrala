import { Canvas } from '../core/Canvas';
import { RenderPipeline } from '../core/RenderPipeline';
import { Shader } from '../core/Shader';
import { WebGPURenderContext } from '../core/WebGPURenderContext';
import { UniformBufferLayout } from '../core/uniformLayoutBuffer/UniformLayoutBuffer';
import { UniformSchema, UniformType } from '../core/uniformLayoutBuffer/uniformLayoutBufferTypes';
import testShader from '../shaders/spritesAttributes.wgsl';

export const drawTriangles = async () => {
    const canvas = new Canvas({
        parentSelector: 'body',
        size: { width: 200, height: 200 },
    });

    const webGPURenderContext = new WebGPURenderContext({
        canvas: canvas.HTMLElement,
        powerPreference: 'high-performance',
    });
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

    const bufferLayout = new UniformBufferLayout({
        color: UniformType.Vec4,
        scale: UniformType.Vec2,
        offset: UniformType.Vec2,
    });

    const uniformBuffer = webGPURenderContext.device.createBuffer({
        label: 'triangles buffer',
        size: bufferLayout.size,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    bufferLayout.setProperty('color', [0, 0, 1, 1]);
    bufferLayout.setProperty('scale', [1, 1]);
    bufferLayout.setProperty('offset', [0, 0]);

    const bindGroup = webGPURenderContext.device.createBindGroup({
        layout: renderPipeline.pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: uniformBuffer,
                },
            },
        ],
    });

    webGPURenderContext.device.queue.writeBuffer(uniformBuffer, 0, bufferLayout.buffer);

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
    renderPass.setBindGroup(0, bindGroup);
    renderPass.draw(3);
    renderPass.end();

    const commandBuffer = encoder.finish();
    webGPURenderContext.device.queue.submit([commandBuffer]);
};

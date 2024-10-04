import { randomFloat } from 'pulsar-pathfinding';

import { Canvas } from '../core/Canvas';
import { RenderPipeline } from '../core/RenderPipeline';
import { Shader } from '../core/Shader';
import { WebGPURenderContext } from '../core/WebGPURenderContext';
import { UniformBufferLayout } from '../core/uniformLayoutBuffer/UniformLayoutBuffer';
import { UniformType } from '../core/uniformLayoutBuffer/uniformLayoutBufferTypes';
import testShader from '../shaders/spritesAttributes.wgsl';

export const drawTriangles = async () => {
    const TRIANGLE_COUNT = 115;

    const canvas = new Canvas({
        parentSelector: '#magistrala-app',
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

    const encoder = webGPURenderContext.device.createCommandEncoder({
        label: 'triangle encoder',
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
    const renderPass = encoder.beginRenderPass(renderPassDescriptor);

    for (let i = 0; i < TRIANGLE_COUNT; i++) {
        const bufferLayout = new UniformBufferLayout({
            color: UniformType.Vec4,
            scale: UniformType.Vec2,
            offset: UniformType.Vec2,
        });
        bufferLayout.setProperty('color', [randomFloat(0, 1), randomFloat(0, 1), randomFloat(0, 1), 1]);
        bufferLayout.setProperty('scale', [0.1, 0.1]);
        bufferLayout.setProperty('offset', [randomFloat(-1, 1), randomFloat(-1, 1)]);

        const uniformBuffer = webGPURenderContext.device.createBuffer({
            label: 'triangles buffer',
            size: bufferLayout.size,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

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

        webGPURenderContext.device.queue.writeBuffer(uniformBuffer, 0, bufferLayout.data);

        renderPass.setPipeline(renderPipeline.pipeline);
        renderPass.setBindGroup(0, bindGroup);
        renderPass.draw(3);
    }

    renderPass.end();

    const commandBuffer = encoder.finish();
    webGPURenderContext.device.queue.submit([commandBuffer]);
};

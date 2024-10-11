import { randomFloat } from 'pulsar-pathfinding';

import { Canvas } from '../../core/Canvas';
import { RenderPipeline } from '../../core/RenderPipeline';
import { Shader } from '../../core/Shader';
import { WebGPURenderContext } from '../../core/WebGPURenderContext';
import { UniformBufferLayout } from '../../core/uniformLayoutBuffer/UniformLayoutBuffer';
import { UniformType, UniformVec2, UniformVec4 } from '../../core/uniformLayoutBuffer/uniformLayoutBufferTypes';
import textureShader from '../../shaders/textures.wgsl';
import { textureFData } from './textureF';

export const drawTexture = async () => {
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
        label: 'texture shader module',
        code: textureShader,
        device: webGPURenderContext.device,
    });
    const kTextureWidth = 5;
    const kTextureHeight = 7;

    const textureRenderPipeline = new RenderPipeline({
        layout: 'auto',
        device: webGPURenderContext.device,
        vertexState: {
            entryPoint: 'vs',
            module: shader.module,
            buffers: [
                {
                    arrayStride: 2 * UniformBufferLayout.BYTES_PER_FLOAT,
                    attributes: [
                        {
                            shaderLocation: 0,
                            offset: 0,
                            format: 'float32x2',
                        },
                    ],
                },
            ],
        },
        fragmentState: {
            entryPoint: 'fs',
            module: shader.module,
            targets: [
                {
                    format: webGPURenderContext.textureFormat,
                },
            ],
        },
    });

    const vertexBufferLayout = new UniformBufferLayout({
        instaces: 6,
        schema: {
            position: UniformType.Vec2,
        },
    });

    vertexBufferLayout.setProperty({ name: 'position', values: [0, 0], offset: 0 });
    vertexBufferLayout.setProperty({ name: 'position', values: [1, 0], offset: 1 });
    vertexBufferLayout.setProperty({ name: 'position', values: [0, 1], offset: 2 });

    vertexBufferLayout.setProperty({ name: 'position', values: [0, 1], offset: 3 });
    vertexBufferLayout.setProperty({ name: 'position', values: [1, 0], offset: 4 });
    vertexBufferLayout.setProperty({ name: 'position', values: [1, 1], offset: 5 });

    const positionBuffer = webGPURenderContext.device.createBuffer({
        label: 'position buffer',
        size: vertexBufferLayout.size,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    webGPURenderContext.device.queue.writeBuffer(positionBuffer, 0, vertexBufferLayout.data);

    const texture = webGPURenderContext.device.createTexture({
        size: [kTextureWidth, kTextureHeight],
        format: 'rgba8unorm',
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });

    webGPURenderContext.device.queue.writeTexture(
        { texture },
        textureFData,
        { bytesPerRow: kTextureWidth * UniformBufferLayout.BYTES_PER_FLOAT },
        { width: kTextureWidth, height: kTextureHeight },
    );

    const sampler = webGPURenderContext.device.createSampler();

    const bindGroup = webGPURenderContext.device.createBindGroup({
        label: 'texture bind group',
        layout: textureRenderPipeline.pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: sampler,
            },
            {
                binding: 1,
                resource: texture.createView(),
            },
        ],
    });

    const encoder = webGPURenderContext.device.createCommandEncoder({
        label: 'texture encoder',
    });

    const renderPassDescriptor: GPURenderPassDescriptor = {
        label: 'texture render pass',
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
    renderPass.setPipeline(textureRenderPipeline.pipeline);
    renderPass.setVertexBuffer(0, positionBuffer);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.draw(6);
    renderPass.end();

    const commandBuffer = encoder.finish();
    webGPURenderContext.device.queue.submit([commandBuffer]);
};

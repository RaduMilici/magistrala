import { randomFloat } from 'pulsar-pathfinding';

import { Canvas } from '../core/Canvas';
import { RenderPipeline } from '../core/RenderPipeline';
import { Shader } from '../core/Shader';
import { WebGPURenderContext } from '../core/WebGPURenderContext';
import { UniformBufferLayout } from '../core/uniformLayoutBuffer/UniformLayoutBuffer';
import { UniformType, UniformVec2, UniformVec4 } from '../core/uniformLayoutBuffer/uniformLayoutBufferTypes';
import testShader from '../shaders/spritesAttributes.wgsl';
import { Torus } from './geometry/Torus';

export const drawToruses = async () => {
    const SPRITE_COUNT = 25;

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
            buffers: [
                {
                    arrayStride: 2 * UniformBufferLayout.BYTES_PER_FLOAT + 4,
                    attributes: [
                        {
                            shaderLocation: 0,
                            offset: 0,
                            format: 'float32x2', // position
                        },
                        {
                            shaderLocation: 4,
                            offset: 8,
                            format: 'unorm8x4', // perVertexColor
                        },
                    ],
                },
                {
                    arrayStride: 8 * UniformBufferLayout.BYTES_PER_FLOAT,
                    stepMode: 'instance',
                    attributes: [
                        {
                            shaderLocation: 1,
                            offset: 0,
                            format: 'unorm8x4', // color
                        },
                        {
                            shaderLocation: 2,
                            offset: 16,
                            format: 'float32x2', // offset
                        },
                        {
                            shaderLocation: 3,
                            offset: 24,
                            format: 'float32x2', // scale
                        },
                    ],
                },
            ],
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

    const bufferLayout = new UniformBufferLayout({
        instaces: SPRITE_COUNT,
        schema: {
            color: UniformType.Vec4,
            offset: UniformType.Vec2,
            scale: UniformType.Vec2,
        },
    });

    for (let i = 0; i < SPRITE_COUNT; i++) {
        const rgba: UniformVec4 = [randomFloat(0, 1), randomFloat(0, 1), randomFloat(0, 1), 1];
        bufferLayout.setProperty({ name: 'color', values: rgba, offset: i });

        const scale: UniformVec2 = [1, 1];
        bufferLayout.setProperty({ name: 'scale', values: scale, offset: i });

        const offset: UniformVec2 = [randomFloat(-1, 1), randomFloat(-1, 1)];
        bufferLayout.setProperty({ name: 'offset', values: offset, offset: i });
    }

    const spriteBuffer = webGPURenderContext.device.createBuffer({
        label: 'triangles buffer',
        size: bufferLayout.size,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    const torus = new Torus({
        radius: 0.3,
        numSubdivisions: 10,
        innerRadius: 0.1,
    });

    const vertexBuffer = webGPURenderContext.device.createBuffer({
        label: 'circle vertex storage buffer',
        size: torus.vertexData.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    const indexBuffer = webGPURenderContext.device.createBuffer({
        label: 'index buffer',
        size: torus.indexData.byteLength,
        usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
    });

    webGPURenderContext.device.queue.writeBuffer(spriteBuffer, 0, bufferLayout.data);
    webGPURenderContext.device.queue.writeBuffer(vertexBuffer, 0, torus.vertexData);
    webGPURenderContext.device.queue.writeBuffer(indexBuffer, 0, torus.indexData);

    const renderPass = encoder.beginRenderPass(renderPassDescriptor);
    renderPass.setPipeline(renderPipeline.pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.setVertexBuffer(1, spriteBuffer);
    renderPass.setIndexBuffer(indexBuffer, 'uint32');
    renderPass.drawIndexed(torus.numVertices, SPRITE_COUNT);

    renderPass.end();

    const commandBuffer = encoder.finish();
    webGPURenderContext.device.queue.submit([commandBuffer]);
};

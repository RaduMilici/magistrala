import { WebGPURenderContext } from './WebGPURenderContext';

export const drawTriangle = async () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const webGPURenderContext = new WebGPURenderContext({ canvas, powerPreference: 'high-performance' });

    await webGPURenderContext.init();

    const shaderModule = webGPURenderContext.device.createShaderModule({
        label: 'triangle shader module',
        code: `
            struct PositionColorOutput {
                @builtin(position) position: vec4f,
                @location(0) color: vec4f,
            };

            const RED: vec4f =   vec4f(1, 0, 0, 1);
            const GREEN: vec4f = vec4f(0, 1, 0, 1);
            const BLUE: vec4f =  vec4f(0, 0, 1, 1);
            const WHITE: vec4f = vec4f(1, 1, 1, 1);

            @vertex fn vs(
                @builtin(vertex_index) vertexIndex: u32
            ) -> PositionColorOutput {
                let pos = array<vec2f, 3>(
                    vec2f( 0,  1),
                    vec2f(-1, -1),
                    vec2f( 1, -1)
                );

                let color = array<vec4f, 3>(RED, GREEN, BLUE);

                var vsOutput: PositionColorOutput;
                vsOutput.position = vec4f(pos[vertexIndex], 0, 1);
                vsOutput.color = color[vertexIndex];
                return vsOutput;
            }

            @fragment fn fs(fsInput: PositionColorOutput) -> @location(0) vec4f {
                let gridSquareSize: u32 = 20;
                let grid = vec2u(fsInput.position.xy) / gridSquareSize;
                let checker = (grid.x + grid.y) % 2 == 1;

                return select(WHITE, fsInput.color, checker);
            }
        `,
    });

    const renderPipeline = webGPURenderContext.device.createRenderPipeline({
        label: 'triangle pipeline',
        layout: 'auto',
        vertex: {
            entryPoint: 'vs',
            module: shaderModule,
        },
        fragment: {
            entryPoint: 'fs',
            module: shaderModule,
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
    renderPass.setPipeline(renderPipeline);
    renderPass.draw(3);
    renderPass.end();

    const commandBuffer = encoder.finish();
    webGPURenderContext.device.queue.submit([commandBuffer]);
};

export const compute = async () => {
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

    const shaderModule = device.createShaderModule({
        label: 'double compute shader module',
        code: `
            @group(0) @binding(0) var<storage, read_write> data: array<f32>;

            @compute @workgroup_size(1) fn computeSomething(
                @builtin(global_invocation_id) id: vec3u
            ) {
                let i = id.x;
                data[i] = data[i] * 2.0;
            }
        `,
    });

    const computePipeline = device.createComputePipeline({
        label: 'doubling compute pipeline',
        layout: 'auto',
        compute: {
            module: shaderModule,
        },
    });

    const input = new Float32Array([1, 3, 5]);

    const workBuffer = device.createBuffer({
        label: 'work buffer',
        size: input.byteLength,
        usage:
            GPUBufferUsage.STORAGE |
            GPUBufferUsage.COPY_SRC |
            GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(workBuffer, 0, input);

    const resultBuffer = device.createBuffer({
        label: 'result buffer',
        size: input.byteLength,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });

    const bindGroup = device.createBindGroup({
        label: 'bind group for work buffer',
        layout: computePipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: workBuffer,
                },
            },
        ],
    });

    const encoder = device.createCommandEncoder({
        label: 'doubling endcoder',
    });

    const computePass = encoder.beginComputePass({
        label: 'doubling compute pass',
    });
    computePass.setPipeline(computePipeline);
    computePass.setBindGroup(0, bindGroup);
    computePass.dispatchWorkgroups(input.length);
    computePass.end();

    encoder.copyBufferToBuffer(
        workBuffer,
        0,
        resultBuffer,
        0,
        resultBuffer.size,
    );

    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);

    await resultBuffer.mapAsync(GPUMapMode.READ);
    const result = new Float32Array(resultBuffer.getMappedRange());

    const inputPre = document.createElement('pre');
    inputPre.textContent = JSON.stringify(Array.from(input));
    document.body.appendChild(inputPre);

    const outputPre = document.createElement('pre');
    outputPre.textContent = JSON.stringify(Array.from(result));
    document.body.appendChild(outputPre);
    resultBuffer.unmap();
};

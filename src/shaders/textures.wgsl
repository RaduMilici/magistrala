struct VertexShaderInput {
    @builtin(vertex_index) vertexIndex: u32,
    @location(0) position: vec2f,
}

struct VertexShaderOutput {
    @builtin(position) position: vec4f,
    @location(1) texcoord: vec2f,
}

@vertex fn vs(input: VertexShaderInput) -> VertexShaderOutput {
    var output: VertexShaderOutput;

    output.position = vec4(input.position, 0, 1);
    output.texcoord = vec2(input.position.x, 1 - input.position.y);

    return output;
}

@group(0) @binding(0) var textureSampler: sampler;
@group(0) @binding(1) var texture: texture_2d<f32>;

@fragment fn fs(fsInput: VertexShaderOutput) -> @location(0) vec4f {
    return textureSample(texture, textureSampler, fsInput.texcoord);
}
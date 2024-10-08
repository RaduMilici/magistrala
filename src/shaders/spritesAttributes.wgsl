struct SpriteAttributes {
    color: vec4f,
    scale: vec2f,
    offset: vec2f,
}

struct VertexShaderOutput {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
}

@group(0) @binding(0) var <storage, read> spriteAttributes: array<SpriteAttributes>;

@vertex fn vs(
    @builtin(vertex_index) vertexIndex: u32,
    @builtin(instance_index) instanceIndex: u32
) -> VertexShaderOutput {
    let pos = array<vec2f, 3>(
        vec2f( 0,  1),
        vec2f(-1, -1),
        vec2f( 1, -1)
    );

    var vsOut: VertexShaderOutput;
    let spriteAttribute = spriteAttributes[instanceIndex];
    let xy = pos[vertexIndex] * spriteAttribute.scale + spriteAttribute.offset;
    vsOut.position = vec4f(xy, 0, 1);
    vsOut.color = spriteAttribute.color;
    return vsOut;
}

@fragment fn fs(vsOut: VertexShaderOutput) -> @location(0) vec4f {
    return vsOut.color;
}
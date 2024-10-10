struct SpriteAttributes {
    color: vec4f,
    scale: vec2f,
    offset: vec2f,
}

struct VertexShaderInput {
    @builtin(vertex_index) vertexIndex: u32,
    @builtin(instance_index) instanceIndex: u32
}

struct VertexShaderOutput {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
}

struct Vertex {
    position: vec2f,
}

@group(0) @binding(0) var <storage, read> spriteAttributesList: array<SpriteAttributes>;
@group(0) @binding(1) var <storage, read> vertices: array<Vertex>;

@vertex fn vs(vsInput: VertexShaderInput) -> VertexShaderOutput {
    var vsOut: VertexShaderOutput;

    let spriteAttribute: SpriteAttributes = spriteAttributesList[vsInput.instanceIndex];
    let vertex: Vertex = vertices[vsInput.vertexIndex];

    let xy: vec2f = vertex.position * spriteAttribute.scale + spriteAttribute.offset;
    vsOut.position = vec4f(xy, 0, 1);
    vsOut.color = spriteAttribute.color;
    
    return vsOut;
}

@fragment fn fs(vsOut: VertexShaderOutput) -> @location(0) vec4f {
    return vsOut.color;
}
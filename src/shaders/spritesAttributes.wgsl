struct SpriteAttributes {
    color: vec4f,
    scale: vec2f,
    offset: vec2f,
}

@group(0) @binding(0) var <uniform> spriteAttributes: SpriteAttributes;

@vertex fn vs(
    @builtin(vertex_index) vertexIndex: u32
) -> @builtin(position) vec4f {
    let pos = array<vec2f, 3>(
        vec2f( 0,  1),
        vec2f(-1, -1),
        vec2f( 1, -1)
    );

    let xy = pos[vertexIndex] * spriteAttributes.scale + spriteAttributes.offset;
    return vec4f(xy, 0, 1);
}

@fragment fn fs() -> @location(0) vec4f {
    return spriteAttributes.color;
}
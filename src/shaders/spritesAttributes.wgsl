struct VertexShaderOutput {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
}

@vertex fn vs(
    @location(0) position: vec2f,
    @location(1) color: vec4f,
    @location(2) offset: vec2f,
    @location(3) scale: vec2f,
    @location(4) perVertexColor: vec3f,
) -> VertexShaderOutput {
    var vsOut: VertexShaderOutput;

    let xy: vec2f = position * scale + offset;
    vsOut.position = vec4f(xy, 0, 1);
    vsOut.color = color * vec4f(perVertexColor, 1);
    
    return vsOut;
}

@fragment fn fs(vsOut: VertexShaderOutput) -> @location(0) vec4f {
    return vsOut.color;
}
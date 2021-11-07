#version 300 es
precision mediump float;

in vec4 v_color;
in vec2 v_texcoord;
in vec3 v_normal;

uniform sampler2D u_texture;
uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;

out vec4 color;

void main() {
  vec3 normal = normalize(v_normal);
  float light = dot(normal, u_reverseLightDirection);
  color = texture(u_texture, v_texcoord);
  color.xyz *= light;
}

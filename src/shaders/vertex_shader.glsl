#version 300 es

in vec2 a_position;
in vec3 a_vertColor;

uniform vec2 u_translation;
uniform vec2 u_rotation;
uniform vec2 u_scale;
uniform float u_pointSize;

out vec3 fragColor;

vec2 getRotatedPosition(vec2 position, vec2 rotation) {
  float rotatedX = position.x * rotation.y + position.y * rotation.x;
  float rotatedY = position.y * rotation.y - position.x * rotation.x;

  return vec2(rotatedX, rotatedY);
}

void main() {
  fragColor = a_vertColor;
  vec2 rotatedPosition = getRotatedPosition(a_position, u_rotation);

  gl_PointSize = u_pointSize;
  gl_Position = vec4(rotatedPosition * u_scale + u_translation, 0., 1.);
}

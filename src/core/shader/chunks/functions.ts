export const getRotatedPosition = `vec2 getRotatedPosition(vec2 position, vec2 rotation) {
  float rotatedX = position.x * rotation.y + position.y * rotation.x;
  float rotatedY = position.y * rotation.y - position.x * rotation.x;

  return vec2(rotatedX, rotatedY);
}`;

export const getClipSpace = `vec2 getClipSpace(vec2 position, vec2 resolution) {
  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = position / resolution;
  
  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;
  
  // convert from 0->2 to -1 -> +1 (clip space)
  return zeroToTwo - 1.0;
}`;

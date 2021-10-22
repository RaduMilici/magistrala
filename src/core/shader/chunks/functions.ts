export const getRotatedPosition = `vec2 getRotatedPosition(vec2 position, vec2 rotation) {
  float rotatedX = position.x * rotation.y + position.y * rotation.x;
  float rotatedY = position.y * rotation.y - position.x * rotation.x;

  return vec2(rotatedX, rotatedY);
}`;

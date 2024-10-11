const _ = [255, 0, 0, 255]; // red
const y = [255, 255, 0, 255]; // yellow
const b = [0, 0, 255, 255]; // blue
export const textureFData = new Uint8Array(
    [b, _, _, _, _, _, y, y, y, _, _, y, _, _, _, _, y, y, _, _, _, y, _, _, _, _, y, _, _, _, _, _, _, _, _].flat(),
);

import { compute } from './scenes/compute';
import { drawTexture } from './scenes/textures/textures';
import { drawToruses } from './scenes/toruses';
import { drawTriangle } from './scenes/triangle';

const start = async () => {
    await drawTriangle();
    await drawToruses();
    await drawTexture();
    await compute();
};

start();

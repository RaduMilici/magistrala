import { compute } from './scenes/compute';
import { drawTexture } from './scenes/textures/textures';
import { drawTriangle } from './scenes/toruses';
import { drawToruses } from './scenes/triangles';

const start = async () => {
    await drawTriangle();
    await drawToruses();
    await drawTexture();
    await compute();
};

start();

import { compute } from './scenes/compute';
import { drawDataTexture } from './scenes/textures/dataTexture';
import { drawToruses } from './scenes/toruses';
import { drawTriangle } from './scenes/triangle';

const start = async () => {
    await drawTriangle();
    await drawToruses();
    await drawDataTexture();
    await compute();
};

start();

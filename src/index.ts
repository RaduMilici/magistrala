import { compute } from './scenes/compute';
import { drawTriangle } from './scenes/toruses';
import { drawToruses } from './scenes/triangles';

const start = async () => {
    await drawTriangle();
    await drawToruses();
    await compute();
};

start();

import { compute } from './scenes/compute';
import { drawTriangle } from './scenes/triangle';

const start = async () => {
    await drawTriangle();
    await compute();
};

start();

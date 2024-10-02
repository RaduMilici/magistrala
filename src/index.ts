import { compute } from './scenes/compute';
import { drawTriangle } from './scenes/triangle';
import { drawTriangles } from './scenes/triangles';

const start = async () => {
    await drawTriangle();
    await drawTriangles();
    await compute();
};

start();

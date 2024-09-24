import { compute } from './compute';
import { drawTriangle } from './triangle';

const start = async () => {
    await drawTriangle();
    await compute();
};

start();

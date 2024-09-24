import { size } from 'pulsar-pathfinding';

export type rendererConfig = {
    fov: number;
    aspect: number;
    near: number;
    far: number;
    container?: HTMLElement | null;
    size?: size;
};

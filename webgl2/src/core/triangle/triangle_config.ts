import { Vertex } from '../Vector3';
import { Color } from '../color/Color';

export type triangle_config = {
    a: Vertex;
    b: Vertex;
    c: Vertex;
    color?: Color;
};

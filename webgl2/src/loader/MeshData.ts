import { Vector } from 'pulsar-pathfinding';

import { Vector3, Vertex } from '../core/Vector3';
import { Triangle } from '../core/triangle/Triangle';

export class MeshData {
    vertices: Array<Vertex> = [];
    triangles: Array<Triangle> = [];
    textureCoords: Array<Vector> = [];
    normals: Array<Vector3> = [];

    verticesText: Array<Array<string>> = [];
    trianglesText: Array<Array<string>> = [];
    textureCoordsText: Array<Array<string>> = [];
    normalsText: Array<Array<string>> = [];
}

import { Vector } from 'pulsar-pathfinding';

import { Vertex } from '../core/Vector3';
import { Triangle } from '../core/triangle/Triangle';

export class MeshData {
  vertices: Array<Vertex> = [];
  triangles: Array<Triangle> = [];
  textureCoords: Array<Vector> = [];
  normals: Array<Vertex> = [];

  verticesText: Array<Array<string>> = [];
  trianglesText: Array<Array<string>> = [];
  textureCoordsText: Array<Array<string>> = [];
  normalsText: Array<Array<string>> = [];
}

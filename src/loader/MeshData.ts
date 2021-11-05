import { Vector } from 'pulsar-pathfinding';

import { Vector3 } from '../core/Vector3';
import { Triangle } from '../core/triangle/Triangle';

export class MeshData {
  vertices: Array<Vector3> = [];
  triangles: Array<Triangle> = [];
  textureCoords: Array<Vector> = [];

  verticesText: Array<Array<string>> = [];
  trianglesText: Array<Array<string>> = [];
  textureCoordsText: Array<Array<string>> = [];
}

import { Vector3 } from '../core/Vector3';
import { Triangle } from '../core/triangle/Triangle';

enum Specifiers {
  VERTEX = 'v',
  FACE = 'f',
}

export class MeshData {
  vertices: Array<Vector3> = [];
  triangles: Array<Triangle> = [];
}

export class ObjLoader {
  public async load(path: string): Promise<MeshData> {
    const response = await fetch(path);
    const text = await response.text();
    return this.readStringData(text);
  }

  private readStringData(text: string): MeshData {
    const meshData = new MeshData();
    const elements = text.split('\n');
    elements.forEach((element) => {
      const [specifier, ...rest] = element.split(' ');
      switch (specifier) {
        case Specifiers.VERTEX:
          ObjLoader.assignVertex(rest, meshData);
          break;
        case Specifiers.FACE:
          ObjLoader.assignTriangle(rest, meshData);
      }
    });
    return meshData;
  }

  private static assignVertex(
    vertexCoordinates: Array<string>,
    meshData: MeshData,
  ) {
    const [x, y, z] = vertexCoordinates.map(parseFloat);
    meshData.vertices.push(new Vector3({ x, y, z }));
  }

  private static assignTriangle(
    triangleIndices: Array<string>,
    meshData: MeshData,
  ) {
    const vertexIndices: Array<number> = [];
    triangleIndices.forEach((index) => {
      // TODO: implement textureCoord and normal once supported
      const [position, textureCoord, normal] = index.split('/').map(parseFloat);
      vertexIndices.push(position - 1);
    });
    const [aIndex, bIndex, cIndex] = vertexIndices;
    const a = meshData.vertices[aIndex];
    const b = meshData.vertices[bIndex];
    const c = meshData.vertices[cIndex];
    meshData.triangles.push(new Triangle({ a, b, c }));
  }
}
